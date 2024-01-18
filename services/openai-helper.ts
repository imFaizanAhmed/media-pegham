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
        return casualPrompt;
    case 'Informative':
        return informativePrompt;
    case 'Professional':
        return professionalPrompt
    case 'Persuasive':
        return persuasivePrompt;

  }
}
