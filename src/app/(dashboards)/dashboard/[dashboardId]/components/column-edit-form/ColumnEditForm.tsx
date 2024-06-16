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
import { DeleteColumnButton } from "../delete-column-button/DeleteColumnButton";

const formSchema = z.object({
  title: z.string().min(1),
});

export function ColumnEditForm({
  title,
  columnId,
  children,
}: {
  columnId: number;
  title: string;
  children?: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const newBody = {
      title: data.title,
      columnId: Number(columnId),
    };
    const response = await fetch("/api/columns", {
      method: "PUT",
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
                    placeholder="칼럼 제목을 입력해주세요"
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <div className="w-full flex justify-between">
              {children}
              <div className="flex gap-2">
                <AlertDialogCancel className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={!form.formState.isValid}
                  className="bg-[#5534da] text-white px-[46px] py-3.5 rounded-lg hover:bg-[#4524ca]"
                >
                  변경
                </AlertDialogAction>
              </div>
            </div>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
}
