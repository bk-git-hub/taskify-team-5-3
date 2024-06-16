"use client";

import Image from "next/image";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import revalidate from "@/util/revalidate";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TagsInput } from "react-tag-input-component";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ICard, Member } from "@/type";

type CardCreateFormProps = {
  dashboardId: number;
  columnId: number;
  members?: Member[];
  cardData: ICard;
};

const formSchema = z.object({
  assignee: z.number().optional(),
  title: z.string().min(1, "제목을 입력해주세요"),
  description: z.string().min(1, "설명을 입력해주세요"),
  tags: z.array(z.string()).optional(),
  dueDate: z.date().optional(),
  imageUrl: z.string().optional(),
});

export function CardEditForm({
  dashboardId,
  columnId,
  members,
  cardData,
}: CardCreateFormProps) {
  const [date, setDate] = useState<Date | undefined>(
    cardData.dueDate ? parseISO(cardData.dueDate) : undefined,
  );
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(
    cardData.imageUrl || "/add_box_large.svg",
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignee: cardData.assignee?.id,
      title: cardData.title,
      description: cardData.description,
      tags: cardData.tags,
      dueDate: cardData.dueDate ? parseISO(cardData.dueDate) : undefined,
      imageUrl: cardData.imageUrl ? cardData.imageUrl : undefined,
    },
  });

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cardData.imageUrl) {
      setImageUrl(cardData.imageUrl);
    }
    if (cardData.dueDate) {
      setDate(parseISO(cardData.dueDate));
    }
  }, [cardData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("dashboardId", dashboardId.toString());
    formData.append("columnId", columnId.toString());
    formData.append("title", data.title);
    formData.append("description", data.description);

    const dueDateString = date
      ? `${format(date, "yyyy-MM-dd", { locale: ko })} 00:00`
      : undefined;

    let assignedMember;
    if (data.assignee !== undefined) {
      assignedMember = members?.find(
        (member) => member.userId === data.assignee,
      );
    }

    if (dueDateString) {
      formData.append("dueDate", dueDateString);
    }

    if (data.tags) {
      formData.append("tags", JSON.stringify(data.tags));
    }

    if (image) {
      formData.append("image", image);
    }

    const imageResponse = await fetch("/api/cards/image", {
      method: "POST",
      body: formData,
    });

    const imgData = await imageResponse.json();

    const reqBody: Record<string, any> = {
      dashboardId: Number(dashboardId),
      columnId: Number(columnId),
      assigneeUserId: data.assignee,
      title: data.title,
      description: data.description,
      tags: data.tags,
      imageUrl: imgData.imageUrl,
    };

    if (dueDateString) {
      reqBody.dueDate = dueDateString;
    }

    const cardResponse = await fetch(`/api/cards/${cardData.id}`, {
      method: "PUT",
      body: JSON.stringify(reqBody),
    });

    const d = await cardResponse.json();
    if (cardResponse.ok) {
      revalidate();
    }
  }

  useEffect(() => {
    console.log("Errors:", form.formState.errors);
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-4 mb-7">
              <FormLabel className="text-lg font-medium">담당자</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const value = e.target.value
                      ? Number(e.target.value)
                      : undefined;
                    field.onChange(value);
                  }}
                  defaultValue={field.value || ""}
                >
                  <option value="">선택해주세요</option>
                  {members?.map((item) => (
                    <option key={item.id} value={item.userId}>
                      {item.nickname}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-4 mb-7">
              <FormLabel className="text-lg font-medium">제목 *</FormLabel>
              <FormControl>
                <input
                  placeholder="제목을 입력해주세요"
                  {...field}
                  className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-4 mb-7">
              <FormLabel className="text-lg font-medium">설명 *</FormLabel>
              <FormControl>
                <textarea
                  placeholder="설명을 입력해주세요"
                  {...field}
                  className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-4 mb-7">
              <FormLabel className="text-lg font-medium">마감일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal px-4 py-3.5",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP", { locale: ko })
                    ) : (
                      <span>날짜를 입력해주세요</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate || undefined);
                      field.onChange(selectedDate || undefined);
                    }}
                    initialFocus
                    locale={ko}
                    {...field}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-4 mb-7">
              <FormLabel className="text-lg font-medium">태그</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onChange={field.onChange}
                  name="tags"
                  placeHolder="입력 후 Enter"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-4 mb-7">
              <FormLabel className="text-lg font-medium">이미지</FormLabel>
              <FormControl>
                <div
                  role="button"
                  className="group relative aspect-square size-[76px] min-w-[76px] cursor-pointer overflow-hidden rounded-md"
                  onClick={() => {
                    fileRef.current?.click();
                  }}
                >
                  <Image
                    className="size-full object-cover"
                    src={imageUrl}
                    unoptimized
                    alt="Profile"
                    width={76}
                    height={76}
                  />
                  <div className="absolute inset-0 hidden size-full bg-black/20 group-hover:block" />
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileRef}
                  />
                </div>
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
            disabled={!form.formState.isValid}
            className="bg-[#5534da] text-white px-[46px] py-3.5 rounded-lg hover:bg-[#4524ca]"
          >
            수정
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
