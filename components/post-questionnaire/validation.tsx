import * as zod from "zod";
import { PostVibe, SocialMediaPlatform } from "./utils";

export const formSchema = zod.object({
    description: zod.string().min(10, {
      message: "Post Description must be at least 10 characters.",
    }),
    socialMediaPlateform: zod.enum(SocialMediaPlatform as [string, ...string[]]),
    vibe: zod.enum(PostVibe as [string, ...string[]]),
    referenceLinks: zod.string().optional()
  });