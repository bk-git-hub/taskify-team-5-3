"use client";

import { useToast } from "@/components/ui/use-toast";
import revalidate from "@/util/revalidate";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
interface Props {
  email: string;
  invitationId: number;
  dashboardId: number;
}

export default function DashboardInvitedTuple({
  email,
  invitationId,
  dashboardId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClick = async () => {
    const response = await fetch(
      `/api/dashboards/invitations/delete?invitationId=${invitationId}&dashboardId=${dashboardId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      toast({
        description: "어라라",
      });
    } else {
      toast({
        description: `그냥 오지 말라 했습니다`,
      });
      revalidate();
    }

    setIsOpen(false);
  };
  return (
    <div className="w-full flex justify-between items-center">
      <span>{email}</span>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <button
            onClick={handleOpen}
            className="text-violet-100 px-7 py-2 border border-gray-300 rounded"
          >
            취소
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-50">
          <Image
            src={"/cancel-inv.png"}
            alt={"uncle-sam"}
            width={400}
            height={400}
            objectFit="contain"
          />
          그냥 오지 말라고 할까요?
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel asChild>
              <button className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
                취소
              </button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                className="bg-violet-100 text-white px-[46px] py-3.5 rounded-lg hover:bg-purple-600"
                onClick={handleClick}
              >
                네
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
