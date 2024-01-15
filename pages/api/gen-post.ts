// import { NextResponse } from "next/server";
import { postFormSchema } from "@/components/post-questionnaire/validation";
import { postGenerator } from "@/services/openai.service";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue } from "zod";

export type GenPostResponseData = {
  message?: string;
  error?: string | ZodIssue[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenPostResponseData>
) {
  try {
    // if GET request
    if (req.method === "POST") {

      // validating payload
      const response = postFormSchema.safeParse(req.body);

      // if validation failed, return error messages
      if (!response.success) {
        const { errors } = response.error;
        return res
          .status(400)
          .json({ message: "Invalid request", error: errors });
      }

      // calling generate Post content
      const steamResponse = await postGenerator.generatePost(req.body);

      // res.status(200).json({ message: post });
      return steamResponse;

    } else {
      // not GET request
      res.status(404).send({ error: "Not Found" });
    }
  } catch (err) {
    // if any error occours
    res.status(500).send({ error: "failed to fetch data" });
  }
  // return new NextResponse(JSON.stringify({ success: true, message: "" }), {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
}
