import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ColumnEditForm } from "../column-edit-form/ColumnEditForm";

type EditColumnModalProps = {
  columnId: number;
  title: string;
};

export default function EditColumnModal({
  title,
  columnId,
}: EditColumnModalProps) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>컬럼 관리</AlertDialogTitle>
      </AlertDialogHeader>
      <ColumnEditForm columnId={columnId} title={title} />
    </>
  );
}
