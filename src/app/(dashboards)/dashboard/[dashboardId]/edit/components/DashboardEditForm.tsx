"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import revalidate from "@/util/revalidate";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const FormSchema = z.object({
  color: z.enum(["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"]),
  dashboardName: z.string().min(1),
});

interface Props {
  dashboardTitle: string;
  currentColor: "#7AC555" | "#760DDE" | "#FFA500" | "#76A5EA" | "#E876EA";
  dashboardId: number;
}

export function DashboardEditForm({
  dashboardTitle,
  currentColor,
  dashboardId,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dashboardName: dashboardTitle,
      color: currentColor,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/dashboards", {
      method: "PUT",
      body: JSON.stringify({
        title: data.dashboardName,
        color: data.color,
        dashboardId: dashboardId,
      }),
    });

    const d = await response.json();

    if (response.ok) {
      revalidate();
      setIsDialogOpen(false); // Close the dialog on successful submission
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[620px] space-y-6 rounded-lg bg-white mt-3 p-7 flex flex-col"
        >
          <div className="flex justify-between w-full ">
            <span className="text-xl font-bold text-black">
              {dashboardTitle}
            </span>
            <FormField
              control={form.control}
              name="color"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-3 relative mt-2">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.trigger("color");
                      }}
                      defaultValue={field.value}
                      className="flex flex-row"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="#7AC555"
                            className="w-[30px] h-[30px] border-0 bg-[#7AC555]"
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="#760DDE"
                            className="w-[30px] h-[30px] border-0 bg-[#760DDE]"
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="#FFA500"
                            className="w-[30px] h-[30px] border-0 bg-[#FFA500]"
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="#76A5EA"
                            className="w-[30px] h-[30px] border-0 bg-[#76A5EA]"
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="#E876EA"
                            className="w-[30px] h-[30px] border-0 bg-[#E876EA]"
                          />
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="dashboardName"
            render={({ field }) => (
              <FormItem className="space-y-2.5 flex flex-col relative mt-4">
                <label htmlFor="dashboard-name">대시보드 이름</label>
                <FormControl>
                  <input
                    id="dashboard-name"
                    placeholder="뉴프로젝트"
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg grow"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="self-end text-white bg-violet-100 rounded px-7 py-2 text-sm"
              >
                변경
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-50">
              대시보드 정보를 수정하시겠습니까?
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <button className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
                    취소
                  </button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button
                    onClick={form.handleSubmit(onSubmit)}
                    className="bg-violet-100 text-white px-[46px] py-3.5 rounded-lg hover:bg-purple-600"
                  >
                    변경
                  </button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </>
  );
}
