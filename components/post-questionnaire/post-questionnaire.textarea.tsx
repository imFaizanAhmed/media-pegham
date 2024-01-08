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

interface PostQuestionnaireTextareaType {
  fieldName: keyof zod.infer<typeof postFormSchema>;
  form: UseFormReturn<zod.infer<typeof postFormSchema>, any, undefined>;
  description: string;
  placeholder: string;
}

export function PostQuestionnaireTextarea({
  form,
  fieldName,
  description,
  placeholder,
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
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
