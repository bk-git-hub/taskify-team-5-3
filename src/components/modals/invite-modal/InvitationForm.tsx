"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useToast } from "@/components/ui/use-toast";
import revalidate from "@/util/revalidate";

const FormSchema = z.object({
  email: z.string().email(),
});

export function InvitationForm({ dashboardId }: { dashboardId: number }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/dashboards/invitations", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        dashboardId: Number(dashboardId),
      }),
    });

    switch (response.status) {
      case 201:
        toast({
          description: "초대가 완료되었습니다",
        });
        break;
      case 400:
        toast({
          description: "이메일 형식이 올바르지 않습니다.",
        });
        break;
      case 403:
        toast({
          description: "대시보드 초대 권한이 없습니다.",
        });
        break;
      case 404:
        toast({
          description: "존재하지 않는 사용자입니다.",
        });
        break;
      case 409:
        toast({
          description: "이미 대시보드에 초대된 멤버입니다.",
        });
        break;
      default:
        toast({
          description: `알 수 없는 오류 발생: ${response.status}`,
        });
    }
    revalidate();
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2.5 flex flex-col relative mt-4">
                <label htmlFor="dashboard-name">이메일</label>
                <FormControl>
                  <input
                    id="dashboard-name"
                    placeholder="example@email.com"
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg grow"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <button className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
                취소
              </button>
            </AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              className="bg-[#5534da] text-white px-[46px] py-3.5 rounded-lg hover:bg-[#4524ca]"
              disabled={!form.formState.isValid}
            >
              초대
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
}
