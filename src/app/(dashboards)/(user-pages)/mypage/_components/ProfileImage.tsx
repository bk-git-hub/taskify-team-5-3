import Image from "next/image";
import { UploadIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { FormValues } from "./ProfileFormProvider";
import { FormField } from "@/components/ui/form";
import { FileInput } from "./FileInput";

type Props = {
  control: Control<FormValues>;
};

export function ProfileImage({ control }: Props) {
  return (
    <FormField
      control={control}
      name="profileURL"
      render={({ field }) => {
        return (
          <div role="button" className="group relative aspect-square size-[182px] min-w-[182px] cursor-pointer overflow-hidden rounded-md" onClick={() => {
            const fileInput = document.querySelector<HTMLInputElement>('input[name="file"]')

            fileInput?.click()
          }}
        >
          <Image
            className="size-full object-cover"
            src={field.value}
            unoptimized
            alt="Profile"
            width={100}
            height={100}
          />
          <div className="absolute inset-0 hidden size-full bg-black/20 group-hover:block" />
          <UploadIcon className="absolute inset-0 m-auto hidden size-12 rounded bg-white/80 p-2 group-hover:block" />
          <FileInput control={control} />
        </div>
        )
      }}
    />
  )
}