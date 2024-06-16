import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

export function DeleteColumnButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <span className="text-gray-300">삭제하기</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-7">
        {/* <EditColumnModal title={title} columnId={columnId} /> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
