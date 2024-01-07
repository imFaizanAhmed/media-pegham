// import { NextResponse } from "next/server";
import { postGenerator } from "@/services/openai.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const post = await postGenerator.generatePostFromDocs();
  // Use singletonInstance for your logic

  console.log("post", post);
  // return new NextResponse(JSON.stringify({ success: true, message: "" }), {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  res.status(200).json({ message: post })
}
