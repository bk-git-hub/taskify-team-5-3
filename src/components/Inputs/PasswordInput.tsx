import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { InputType } from "./InputType";

const PasswordInputComponent = ({ label, type, id, value, placeholder, onChange }: InputType) => {
  return (
    <FormItem className="relative">
      <FormLabel className="text-lg">{label}</FormLabel>
      <FormControl>
        <PasswordInput
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="text-md h-12 font-normal placeholder:opacity-50 focus:border-violet-100 focus:border-[1px] focus:border-solid"
        />
      </FormControl>
    </FormItem>
  );
}

export default PasswordInputComponent;