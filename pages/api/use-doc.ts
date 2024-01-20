import { postGenerator } from "@/services/openai.service";

// Using Edge runtime
export const config = {
    runtime: 'edge',
  };
  
export default async function handler() {
  try {
    await postGenerator.browsingTool();
    return new Response(`Success`, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
      } catch (error) {
    console.log(error);
  }
}
