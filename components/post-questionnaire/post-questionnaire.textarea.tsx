import * as zod from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { postFormSchema } from "./validation";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "../ui";
import { ChangeEventHandler } from "react";

interface PostQuestionnaireTextareaType {
  fieldName: keyof zod.infer<typeof postFormSchema>;
  form: UseFormReturn<zod.infer<typeof postFormSchema>, any, undefined>;
  description: string;
  placeholder: string;
  input?: string;
  handleInputChange?: ChangeEventHandler<HTMLTextAreaElement>
}

export function PostQuestionnaireTextarea({
  form,
  fieldName,
  description,
  placeholder,
  input,
  handleInputChange
}: PostQuestionnaireTextareaType) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel className="text-2xl">Post description</FormLabel> */}
          <FormDescription className="text-lg font-[500]">
            {description}
          </FormDescription>
          <FormControl>
            <Textarea placeholder={placeholder} onChange={handleInputChange} value={input}/>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
