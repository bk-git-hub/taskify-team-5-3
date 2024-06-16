"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import revalidate from "@/util/revalidate";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  content: z.string().min(1, "댓글을 작성해주세요"),
});

export function CommentForm({
  cardId,
  columnId,
  dashboardId,
}: {
  cardId: number;
  columnId: number;
  dashboardId: number;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange", // To update form state on change
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content: data.content,
        cardId: Number(cardId),
        columnId: Number(columnId),
        dashboardId: Number(dashboardId),
      }),
    });

    switch (response.status) {
      case 201:
        toast({
          description: "댓글이 등록되었습니다",
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
          className="w-full space-y-6 relative min-w-[450px] shrink-0"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="space-y-2.5 flex flex-col relative mt-4">
                <label htmlFor="comment" className="font-medium">
                  댓글
                </label>
                <FormControl>
                  <textarea
                    id="comment"
                    placeholder="댓글 작성하기"
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg resize-none text-sm shrink-0"
                    style={{ height: "110px" }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="absolute bottom-3 right-3 px-8 py-2 border border-gray-300 rounded text-xs text-violet-100 font-medium bg-white hover:bg-gray-200 disabled:bg-white"
            disabled={!form.formState.isValid}
          >
            입력
          </Button>
        </form>
      </Form>
    </>
  );
}
