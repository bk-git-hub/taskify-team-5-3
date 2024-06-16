import {
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputType } from "./InputType";

const InputComponent = ({ label, type, id, value, placeholder, onChange }: InputType) => {
  return (
    <FormItem className="relative">
      <FormLabel className="text-lg">{label}</FormLabel>
      <FormControl>
        <Input
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="text-md h-12 font-normal placeholder:opacity-50 focus:border-violet-100 focus:border-[1px] focus:border-solid ${ error ? 'border-red-50' : 'border-gray-300 }'"
        />
      </FormControl>
    </FormItem>
  );
}

export default InputComponent;