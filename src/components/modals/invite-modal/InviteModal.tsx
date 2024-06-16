import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InvitationForm } from "./InvitationForm";

export default function InviteModal({ dashboardId }: { dashboardId: number }) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>초대하기</AlertDialogTitle>
      </AlertDialogHeader>
      <InvitationForm dashboardId={dashboardId} />
    </>
  );
}
