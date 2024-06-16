import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "./ProfileFormProvider";

type Props = {
  control: Control<FormValues>;
};

export function EmailInput({ control }: Props) {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-lg">이메일</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled
                className="text-md h-12 font-normal placeholder:opacity-50 focus:outline-none"
                placeholder="your@email.com"
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
