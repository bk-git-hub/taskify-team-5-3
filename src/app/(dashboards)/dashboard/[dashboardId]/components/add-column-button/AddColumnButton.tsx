import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import CreateColumnModal from "../create-column-modal/CreateColumnModal";

export function AddColumnButton({ dashboardId }: { dashboardId: number }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-center gap-3 px-6 py-7 bg-white border-[#5534DA]"
        >
          <span className="text-lg">새로운 컬럼 추가하기</span>
          <Image
            src="/add_box_large.svg"
            alt="add_box"
            width={22}
            height={22}
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-7">
        <CreateColumnModal dashboardId={dashboardId} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
