import * as zod from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postFormSchema } from "./validation";
import { UseFormReturn } from "react-hook-form";

interface PostQuestionnaireSelectType {
  fieldName: keyof zod.infer<typeof postFormSchema>;
  form: UseFormReturn<zod.infer<typeof postFormSchema>, any, undefined>;
  description: string;
  placeholder: string;
  options: string[];
}

export function PostQuestionnaireSelect({
  form,
  fieldName,
  description,
  placeholder,
  options,
}: PostQuestionnaireSelectType) {
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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem value={option} key={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
