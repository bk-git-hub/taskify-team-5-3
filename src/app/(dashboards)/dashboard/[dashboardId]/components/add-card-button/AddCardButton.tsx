import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import CreateCardModal from "../create-card-modal/CreateCardModal";

type CreateCardModalProps = {
  dashboardId: number;
  columnId: number;
};

export default function AddCardButton({
  dashboardId,
  columnId,
}: CreateCardModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className=" bg-white border-2 border-[#D9D9D9] w-full">
          <Image src="/add_box_large.svg" alt="add" width={22} height={22} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-7">
        <CreateCardModal dashboardId={dashboardId} columnId={columnId} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
