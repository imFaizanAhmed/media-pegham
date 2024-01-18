import { genPostSchema } from "@/components/post-questionnaire/validation";
import { ChatCompletionRequestMessageRoleEnum } from "openai-edge";
import * as zod from "zod";

export function prompt({
  socialMediaPlateform,
  vibe,
  messages,
}: zod.infer<typeof genPostSchema>) {
  return [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: `You are a world class digital content writer.
        
      When I ask for help to write something, you will reply in a very professional way.`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Write a social media post for ${socialMediaPlateform}. Start your response with a punchy catchphrase to capture attention and then explain the topic in detail and ${vibe} way.

    topic: ${messages[messages.length - 1].content}`,
    },
  ];
}
