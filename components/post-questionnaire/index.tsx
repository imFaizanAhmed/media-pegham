"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { PostQuestionnaireSelect } from "./post-questionnaire.select";
import { postFormSchema } from "./validation";
import { PostVibe, SocialMediaPlatform } from "./utils";
import { PostQuestionnaireTextarea } from "./post-questionnaire.textarea";
import { useChat } from "ai/react";
import { ChatCompletionRequestMessageRoleEnum } from "openai-edge";

export function PostQuestionnaire() {
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>("");
  // Defining form fields
  const form = useForm<zod.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      description: "",
      socialMediaPlateform: SocialMediaPlatform[0],
      vibe: PostVibe[0],
      referenceLinks: "",
    },
  });

  // Getting functionality from ai/react
  const { messages, handleInputChange, input, handleSubmit, error } = useChat({
    api: "api/gen-post",
    body: {
      ...form.getValues(),
    },
  });
  
  function onsubmit(e: any) {
    if (!!input)
    setUserPrompt(input);
    handleSubmit(e);
  }

  useEffect(() => {
    if (generatedPost?.startsWith("invalid request")) {
      
    } else {
      let data = "";
      if (!!messages && messages.length > 1) {
        messages.forEach((message) => {
          if (
            message.role === ChatCompletionRequestMessageRoleEnum.Assistant ||
            message.role === ChatCompletionRequestMessageRoleEnum.System
          ) {
            data = message.content;
          }
        });
        setGeneratedPost(data);
      }
    }
  }, [messages]);

  // renderer
  return (
    <Form {...form}>
      <div className="flex justify-center mt-12">
        <form onSubmit={onsubmit} className="space-y-8 w-[80%]">
          <PostQuestionnaireTextarea
            form={form}
            fieldName="description"
            input={input}
            handleInputChange={handleInputChange}
            description="1. Write brief description about the post. You can write the
            topic names, keywords, or any detail."
            placeholder="e.g. Write a article about importants of AI in development."
          />
          <PostQuestionnaireTextarea
            form={form}
            fieldName="referenceLinks"
            description="2. Provide reference post link. Enter multiple links seperated by comma."
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
              <span>Generate your post</span>
          </Button>

          {!error && !!generatedPost && (
            <div className="p-4 border-solid border-2">
                <div className="whitespace-pre-wrap">
                  <span className="font-bold capitalize">{userPrompt}</span>
                  <br />
                  <br />
                  <span>{generatedPost}</span>
                </div>
            </div>
          )}
          {!!error && (
            <div className="text-[#dc2626]">We slipped your response. Please try again in a while.</div>
          )}
        </form>
      </div>
    </Form>
  );
}
