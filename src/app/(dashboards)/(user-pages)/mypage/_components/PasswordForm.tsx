"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PasswordInput } from "@/components/ui/password-input";

const FormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "8자 이상 입력해 주세요.",
    }),
    newPassword: z.string().min(8, {
      message: "8자 이상 입력해 주세요.",
    }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmNewPassword"],
  });

type FormValues = z.infer<typeof FormSchema>;

export function PasswordForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: FormValues) => {
    const body = {
      password: data.currentPassword,
      newPassword: data.newPassword,
    };

    try {
      const response = await fetch("/api/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log(response);

      if (response.status === 204) {
        const msg = "비밀번호 변경이 완료 되었습니다.";
        toast({
          description: msg,
        });
      } else if (`${response.status}`.startsWith("4")) {
        const { message } = await response.json();
        toast({
          variant: "destructive",
          description: message,
        });
        // console.log(response.body);
      }
    } catch (error) {
      const msg = "다시 한번 시도해주세요";
      toast({
        variant: "destructive",
        description: msg,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-[620px] flex-col gap-6 rounded-lg bg-white px-7 py-8"
      >
        <h2 className="font-bold text-2xl text-[#333236]">비밀번호 변경</h2>
        <div className="mt-2 flex flex-col gap-5">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-lg">현재 비밀번호</FormLabel>
                <FormControl>
                  <PasswordInput
                    className="h-12 text-md placeholder:opacity-50"
                    placeholder="현재 비밀번호 입력"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-lg">새 비밀번호</FormLabel>
                <FormControl>
                  <PasswordInput
                    className={`h-12 text-md placeholder:opacity-50`}
                    placeholder="새 비밀번호 입력"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-lg">새 비밀번호 확인</FormLabel>
                <FormControl>
                  <PasswordInput
                    className={`h-12 text-md placeholder:opacity-50`}
                    placeholder="새 비밀번호 입력"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="h-8 w-20 bg-[#5534DA] hover:bg-[#5534DA]/80"
          >
            변경
          </Button>
        </div>
      </form>
    </Form>
  );
}
