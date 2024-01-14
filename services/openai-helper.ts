import { BaseMessagePromptTemplateLike } from "@langchain/core/prompts";

import { PostVibeType } from "@/components/post-questionnaire/utils";
import {
  funnyPrompt,
  casualPrompt,
  informativePrompt,
  persuasivePrompt,
  professionalPrompt,
} from "@/lib/prompts";

// function to return the prompt for desire vibe
export function getPromptFromVibe(vibe: PostVibeType): BaseMessagePromptTemplateLike[] {

  switch (vibe) {
    case "Funny":
      return funnyPrompt;
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
