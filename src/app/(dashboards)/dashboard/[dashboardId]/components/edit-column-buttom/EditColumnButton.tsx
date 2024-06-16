"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ColumnEditForm } from "../column-edit-form/ColumnEditForm";

import { useState } from "react";
import revalidate from "@/util/revalidate";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import DeleteColumnModal from "../delete-column-modal/DeleteColumnModal";

type EditColumnButtonProps = {
  columnId: number;
  title: string;
};

export function EditColumnButton({ columnId, title }: EditColumnButtonProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/columns/${columnId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast({
        description: "어라라",
      });
    } else {
      toast({
        description: `${title} 칼럼을 흔적도 없이 지워버렸습니다`,
      });
      revalidate();
    }

    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Image src="/settings.svg" alt="settings" width={24} height={24} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-7">
          <AlertDialogHeader>
            <AlertDialogTitle>컬럼 관리</AlertDialogTitle>
          </AlertDialogHeader>
          <ColumnEditForm columnId={columnId} title={title}>
            <Button
              variant="ghost"
              className="p-0 flex h-fit self-end"
              onClick={handleDeleteModalOpen}
              type="button"
            >
              <span className="text-gray-400 underline">삭제하기</span>
            </Button>
          </ColumnEditForm>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="p-7">
          <DeleteColumnModal
            title={title}
            onCancel={() => setIsDeleteModalOpen(false)}
            onDelete={handleDelete}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
