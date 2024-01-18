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
import { LoadingSpinner } from "../ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { useChat } from "ai/react";
import { ChatCompletionRequestMessageRoleEnum } from "openai-edge";

export function PostQuestionnaire() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
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

  const { messages, handleInputChange, handleSubmit, error } = useChat({
    api: "api/gen-post",
    body: {
      ...form.getValues(),
    },
  });

  function onsubmit(e: any) {
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

  console.log("error", error)

  // renderer
  return (
    <Form {...form}>
      <div className="flex justify-center mt-12">
        <form onSubmit={onsubmit} className="space-y-8 w-[80%]">
          <PostQuestionnaireTextarea
            form={form}
            fieldName="description"
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
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <LoadingSpinner className="text-primary-foreground mr-2" />{" "}
                Doing magic
              </>
            ) : (
              <span>Generate your post</span>
            )}
          </Button>

          {!error && (!!generatedPost || isLoading) && (
            <div className="p-4 border-solid border-2">
              {!isLoading && (
                <div className="whitespace-pre-wrap">
                  <span>{generatedPost}</span>
                </div>
              )}
              {isLoading && (
                <>
                  <span>Generating Post</span>
                  <Skeleton className="w-[100%] h-[200px]" />
                </>
              )}
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
