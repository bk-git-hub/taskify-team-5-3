"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PropsWithChildren } from "react";
import { ProfileForm } from "./ProfileForm";
import { save } from "./save";

const FormSchema = z.object({
  email: z.string().email(),
  name: z.string().max(10, {
    message: "열 자 이하로 작성해주세요.",
  }),
  profileURL: z.string().url(),
  file: z.any(),
});

export type FormValues = z.infer<typeof FormSchema>;

type Props = PropsWithChildren<{
  defaultValues: FormValues;
}>;

export function ProfileFormProvider({ defaultValues, children }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues,
  });

  const { control } = form;

  return (
    <Form {...form}>
      <form action={save}>
        <ProfileForm control={control} />
      </form>
    </Form>
  );
}
