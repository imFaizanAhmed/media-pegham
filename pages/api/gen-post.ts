// import { NextResponse } from "next/server";
import { genPostSchema } from "@/components/post-questionnaire/validation";
import { postGenerator } from "@/services/openai.service";
import { ZodIssue } from "zod";
import { StreamingTextResponse } from 'ai'

export type GenPostResponseData = {
  message?: string;
  error?: string | ZodIssue[];
};

// Using Edge runtime
export const config = {
  runtime: 'edge',
};

export default async function handler(
  req: Request
) {
  try {
    // if GET request
    if (req.method === "POST") {

      const data = await req.json()

      // validating payload
      const response = genPostSchema.safeParse(data);

      // if validation failed, return error messages
      if (!response.success) {
        const { errors } = response.error;
        return new Response(`invalid request: ${errors}`, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        });
      }

      // calling generate Post content
      const stream = await postGenerator.generatePost(data);

      return new StreamingTextResponse(stream);

    } else {
      return new Response("API Not Found", {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }
  } catch (err) {
    // if any error occours
    return new Response(`stream error: ${err}`, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
