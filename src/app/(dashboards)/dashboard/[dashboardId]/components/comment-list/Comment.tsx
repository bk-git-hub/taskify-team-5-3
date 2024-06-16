"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import revalidate from "@/util/revalidate";
import { Button } from "@/components/ui/button";
import CustomAvatar from "@/components/custom-avatar/CustomAvatar";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function formatDateWithTime(dateString: string): string {
  const date = new Date(dateString);

  // Get UTC components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
};

const FormSchema = z.object({
  content: z.string().min(1, "댓글을 작성해주세요"),
});

export default function CommentComponent({ comment }: { comment: Comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // State for managing delete dialog
  const { toast } = useToast();

  const time = comment.updatedAt ? comment.updatedAt : comment.createdAt;
  const date = formatDateWithTime(time);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { content: comment.content },
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      body: JSON.stringify({
        content: data.content,
      }),
    });
    const res = await response.json();
    if (response.ok) {
      toast({
        description: "댓글이 수정되었습니다",
      });
      setIsEditing(false);
      revalidate();
    } else {
      toast({
        description: `알 수 없는 오류 발생: ${res.message}`,
      });
    }
  }

  async function onDelete() {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "DELETE",
    });
    const res = await response.json();
    if (response.ok) {
      toast({
        description: "댓글이 삭제되었습니다",
      });
      setIsDeleting(false); // Close the delete dialog
      setIsEditing(false); // Exit editing mode if deletion successful
      revalidate();
    } else {
      toast({
        description: `알 수 없는 오류 발생: ${res.message}`,
      });
    }
  }

  return (
    <div className="flex border border-gray-300 rounded p-2 gap-2.5">
      <Avatar>
        <CustomAvatar
          imgUrl={comment.author.profileImageUrl}
          size={34}
          userId={comment.author.id}
          nickname={comment.author.nickname}
        />
      </Avatar>

      <div className="flex flex-col py-2 flex-grow">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-semibold">
            {comment.author.nickname}
          </span>
          <span className="text-gray-400 text-xs">{date}</span>
        </div>
        {isEditing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 relative"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="space-y-2.5 flex flex-col relative mt-4">
                    <label htmlFor="comment" className="font-medium">
                      댓글 수정
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
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-xs text-violet-100 font-medium bg-white hover:bg-gray-200"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 border border-gray-300 rounded text-xs text-violet-100 font-medium bg-white hover:bg-gray-200 disabled:bg-white"
                  disabled={!form.formState.isValid}
                >
                  저장
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <p>{comment.content}</p>
        )}
        {!isEditing && (
          <div className="flex gap-2 mt-1.5 text-xs underline text-gray-400">
            <button onClick={() => setIsEditing(true)}>수정</button>
            <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
              <AlertDialogTrigger asChild>
                <button>삭제</button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-fit">
                <Image
                  src={"/delete-sure.jpg"}
                  width={900}
                  height={506}
                  objectFit="contain"
                  alt="삭제"
                />
                정말로 댓글을 삭제하시겠습니까?
                <div className="flex w-full justify-center gap-3">
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction
                    asChild
                    onClick={onDelete} // Call onDelete when delete button in dialog is clicked
                  >
                    <button className="bg-red-500 text-white px-4 rounded hover:bg-red-600">
                      삭제
                    </button>
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}
