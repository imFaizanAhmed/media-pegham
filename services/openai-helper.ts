import { genPostSchema } from "@/components/post-questionnaire/validation";
import {
  funnyPrompt,
  casualPrompt,
  informativePrompt,
  persuasivePrompt,
  professionalPrompt,
} from "@/lib/prompts";
import * as zod from 'zod';

// function to return the prompt for desire vibe
export function getPromptFromVibe(data: zod.infer<typeof genPostSchema>) :any {

  switch (data.vibe) {
    case "Funny":
      return funnyPrompt(data);
    case 'Casual':
        return casualPrompt(data);
    case 'Informative':
        return informativePrompt(data);
    case 'Professional':
        return professionalPrompt(data)
    case 'Persuasive':
        return persuasivePrompt(data);

  }
}
