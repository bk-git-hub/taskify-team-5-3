// app/signup/page.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";

import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({ message: "이메일 형식으로 작성해 주세요." }),
  password: z
  .string()
  .min(8, { message: "8자리 이상 입력해 주세요." }),
  nickname: z.string().max(10, { message: "열 자 이하로 작성해 주세요." }),
  checkPassword: z.string(),})
  .refine((values) => values.password === values.checkPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["checkPassword"],
});

export type FormValues = z.infer<typeof FormSchema>;

const SignupPage = () => {

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
      checkPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const userinfo = {
      email: values.email,
      nickname: values.nickname,
      password: values.password,
    };

    try {
      const response = await fetch('https://sp-taskify-api.vercel.app/5-3/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify((userinfo)),
      });

      if (response.ok) {
        router.push(`/login`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='mx-auto flex-col pt-[223px] text-center'>
        <Link href='/'>
          <div className='mx-auto my-0 inline-block justify-center'>
            <Image src={"/taskify-logo-with-letter.png"} alt='taskify' width={200} height={279} />
          </div>
        </Link>
        <h1 className='mt-[10px] text-lg text-[20px]'>첫 방문을 환영합니다!</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-[520px] h-[50px] flex-col gap-6 rounded-lg bg-white px-7 py-8 font-bold text-gray-700 mx-auto">
          <div className="flex gap-4">
            <div className="flex grow flex-col gap-[16px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-lg">이메일</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-md placeholder:opacity-50 placeholder:font-normal"
                      placeholder="이메일을 입력해 주세요"
                      {...field}
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-lg">닉네임</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-md placeholder:opacity-50 placeholder:font-normal"
                      placeholder="닉네임을 입력해 주세요"
                      {...field}
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-lg">비밀번호</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="h-12 text-md placeholder:opacity-50 placeholder:font-normal"
                      placeholder="비밀번호를 입력해 주세요"
                      {...field}
                    />
                  </FormControl>
                <FormMessage className="text-red-50" />
              </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-lg">비밀번호 확인</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="h-12 text-md placeholder:opacity-50 placeholder:font-normal"
                      placeholder="비밀번호를 한번 더 입력해 주세요"
                      {...field}
                    />
                  </FormControl>
                <FormMessage className="text-red-50" />
              </FormItem>
              )}
            />
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                이용약관에 동의합니다.
              </label>
            </div>
          </div>
          <div className="flex">
            <Button type="submit" className="h-[50px] w-[520px] bg-violet-100 hover:bg-violet-100/80 text-[18px]">
              가입하기
            </Button>
          </div>
          <p className="font-normal flex justify-center"> 이미 가입하셨나요?&nbsp;
            <Link href="/login" className="underline text-violet-100">
              로그인하기
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignupPage;