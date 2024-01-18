import * as zod from "zod";
import { PostVibe, SocialMediaPlatform } from "./utils";

export const postFormSchema = zod.object({
  description: zod.string(),
  socialMediaPlateform: zod.enum(SocialMediaPlatform as [string, ...string[]]),
  vibe: zod.enum(PostVibe as [string, ...string[]]),
  referenceLinks: zod.string().optional(),
});

export const genPostSchema = zod.object({
  description: zod.string(),
  socialMediaPlateform: zod.enum(SocialMediaPlatform as [string, ...string[]]),
  vibe: zod.enum(PostVibe as [string, ...string[]]),
  referenceLinks: zod.string().optional(),
  messages: zod.object({ role: zod.string(), content: zod.string() }).array(),
});
