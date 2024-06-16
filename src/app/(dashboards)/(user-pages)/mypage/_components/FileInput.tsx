"use client";

import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { FormValues } from "./ProfileFormProvider";
import { FormField } from "@/components/ui/form";
import { Control, useFormContext } from "react-hook-form";

type Props = {
  control: Control<FormValues>;
};

export function FileInput({ control }: Props) {
  const { setValue } = useFormContext<FormValues>();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setValue("profileURL", url);
  };

  return (
    <FormField
      control={control}
      name="file"
      render={({ field }) => (
        <Input
          {...field}
          ref={fileRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            handleFileChange(e);
            field.onChange(e);
          }}
        />
      )}
    />
  );
}
