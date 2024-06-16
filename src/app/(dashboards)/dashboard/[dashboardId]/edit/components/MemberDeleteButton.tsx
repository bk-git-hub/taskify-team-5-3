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
import revalidate from "@/util/revalidate";
import { useState } from "react";
import Image from "next/image";

interface Props {
  nickname: string;
  memberId: number;
}

export default function MemberDeleteButton({ nickname, memberId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClick = async () => {
    const response = await fetch(`/api/members/${memberId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast({
        description:
          errorData.message || "An error occurred while deleting the member.",
      });
    } else {
      toast({
        description: `${nickname}님은 우주선을 타고 먼길을 떠났습니다... 그는 좋은 ${nickname} 이었습니다`,
      });
      revalidate();
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button
          onClick={handleOpen}
          className="text-violet-100 px-7 py-2 border border-gray-300 rounded"
        >
          삭제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-50">
        <div className="flex flex-col items-center">
          <Image
            src={"/dontgo.png"}
            alt={"interstellar"}
            width={500}
            height={200}
            objectFit="contain"
          />
          <span>
            {nickname}님을{" "}
            <b className="text-red-500">
              지구밖으로 영원히 추방시키시겠습니까?
            </b>
          </span>
        </div>
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
              추방
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
