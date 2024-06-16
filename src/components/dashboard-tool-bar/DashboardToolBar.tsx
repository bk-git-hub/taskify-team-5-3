import ToolBarButton from "@/components/ui/tool-bar-button/ToolBarButton";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import InviteModal from "../modals/invite-modal/InviteModal";
import Link from "next/link";

export default function DashboardToolBar({
  dashboardId,
}: {
  dashboardId: number;
}) {
  return (
    <div className="flex gap-4">
      <Link href={`/dashboard/${dashboardId}/edit`}>
        <ToolBarButton>
          <Image src={"/settings.svg"} width={20} height={20} alt="settings" />
          관리
        </ToolBarButton>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger>
          <ToolBarButton>
            <Image src={"/add_box.svg"} width={20} height={20} alt="invite" />
            초대하기
          </ToolBarButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <InviteModal dashboardId={dashboardId} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
