"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import revalidate from "@/util/revalidate";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

export default function CardDropDown({
  cardId,
  setter,
  editsetter,
}: {
  cardId: number;
  setter: any;
  editsetter: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const { toast } = useToast();

  const onDelClick = () => {
    setIsOpen(false);
    setIsDelOpen(true);
  };

  const onDelete = async () => {
    const response = await fetch(`/api/cards/${cardId}`, {
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
        description: `카드 삭제완료`,
      });
      setter(false);
      revalidate();
    }
    setIsOpen(false);
    setIsDelOpen(false);
  };

  const onEditClick = () => {
    setIsOpen(false);
    setIsDelOpen(false);
    setter(false);
    editsetter(true);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <Image src={"/jjj.svg"} width={28} height={28} alt="더보기" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className={cn("focus:bg-[#f1effd] focus:text-[#5534da]")}
            onClick={onEditClick}
          >
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(" focus:bg-[#f1effd] focus:text-[#5534da]")}
            onClick={onDelClick}
          >
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isDelOpen} onOpenChange={setIsDelOpen}>
        <AlertDialogContent className="w-fit">
          <Image
            src={"/card-delete.jpg"}
            alt={"uncle-sam"}
            width={400}
            height={400}
            objectFit="contain"
          />
          카드를 삭제하시겠습니까?
          <AlertDialogFooter>
            <div className="w-full flex gap-2 justify-center">
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                className="text-white bg-red-500 hover:bg-red-600 px-4 rounded"
                onClick={onDelete}
              >
                삭제
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
