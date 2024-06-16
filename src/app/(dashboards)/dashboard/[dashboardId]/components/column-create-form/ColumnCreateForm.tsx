"use client";

import revalidate from "@/util/revalidate";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  title: z.string().min(1),
});

export function ColumnCreateForm({
  dashboardId,
  titles,
}: {
  dashboardId: number;
  titles: string[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const title = form.watch("title");
  const test = titles.includes(title);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(title);
    const newBody = { title: data.title, dashboardId: Number(dashboardId) };
    const response = await fetch("/api/columns", {
      method: "POST",
      body: JSON.stringify({
        ...newBody,
      }),
    });

    const d = await response.json();
    if (response.ok) {
      revalidate();
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4 mb-7">
                <FormLabel className="text-lg font-medium">이름</FormLabel>
                <FormControl>
                  <input
                    id="title"
                    placeholder="새로운 프로젝트"
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={!form.formState.isValid || test}
              className="bg-[#5534da] text-white px-[46px] py-3.5 rounded-lg hover:bg-[#4524ca]"
            >
              생성
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
}
