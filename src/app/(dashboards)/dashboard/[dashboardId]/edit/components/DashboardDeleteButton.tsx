"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import revalidateMyDashboard from "@/util/revalidateMyDashboard";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
interface Props {
  dashboardId: number;
}

export default function DashboardDeleteButton({ dashboardId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClick = async () => {
    const response = await fetch(`/api/dashboards/${dashboardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast({
        description: "삭제 도중 오류 발생",
      });
    } else {
      revalidateMyDashboard();
      router.push("/mydashboard");
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button
          onClick={handleOpen}
          className="bg-red-500 text-white text-lg px-24 py-5 rounded w-fit"
        >
          대시보드 삭제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-50">
        <Image
          src={"/dashboard-delete.jpeg"}
          alt={"uncle-sam"}
          width={400}
          height={400}
          objectFit="contain"
        />
        <span className="text-bold text-red-500">
          정말로 대시보드를 삭제하시겠습니까?
        </span>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel asChild>
            <button className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
              취소
            </button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              className="bg-red-500 text-white px-[46px] py-3.5 rounded-lg hover:bg-red-600"
              onClick={handleClick}
            >
              삭제
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
