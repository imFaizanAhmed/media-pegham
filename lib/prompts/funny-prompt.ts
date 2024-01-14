import { BaseMessagePromptTemplateLike } from "@langchain/core/prompts";

export const prompt: BaseMessagePromptTemplateLike[] = [
  [
    "system",
    `You are a world class digital content writer.
        
    When I ask for help to write something, you will reply with a where each paragraph contains at least one joke or playful comment.`,
  ],
  [
    "user",
    `Write a social media post for {socialMedia}. Start your response with a joke to capture attention and then explain the topic in detail and {vibe} way.

    topic: {topic}`,
  ],
];
