import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "./ProfileFormProvider";

type Props = {
  control: Control<FormValues>;
};

export function NameInput({ control }: Props) {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-lg">닉네임</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="text-md h-12 font-normal focus:outline-none focus:border-[#5534DA]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
