"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { PostQuestionnaireSelect } from "./post-questionnaire.select";
import { formSchema } from "./validation";
import { PostVibe, SocialMediaPlatform } from "./utils";
import { PostQuestionnaireTextarea } from "./post-questionnaire.textarea";

export function PostQuestionnaire() {
  // Defining form fields
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      socialMediaPlateform: SocialMediaPlatform[0],
      vibe: PostVibe[0],
      referenceLinks: "",
    },
  });

  // Submit handler
  function onSubmit(values: zod.infer<typeof formSchema>) {
    console.log(values);
  }

  // renderer
  return (
    <Form {...form}>
      <div className="flex justify-center mt-12">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[80%]"
        >
          <PostQuestionnaireTextarea
            form={form}
            fieldName="description"
            description="1. Write brief description about the post. You can write the
            topic names, keywords, or any detail."
            placeholder="e.g. Write a article about importants of AI in development."
          />
          <PostQuestionnaireTextarea
            form={form}
            fieldName="referenceLinks"
            description="2. Write reference post link. Enter multiple links seperated by comma."
            placeholder="e.g. https://medium.com/@imfaizanahmed/circuit-breaker-pattern-to-avoid-service-failures-7c562504a686"
          />
          <PostQuestionnaireSelect
            form={form}
            fieldName="socialMediaPlateform"
            description="3. Select social media"
            placeholder="Social media"
            options={SocialMediaPlatform}
          />
          <PostQuestionnaireSelect
            form={form}
            fieldName="vibe"
            description="4. Select your vibe"
            placeholder="Vibe"
            options={PostVibe}
          />
          <Button type="submit" className="w-full">
            Generate your post
          </Button>
        </form>
      </div>
    </Form>
  );
}
