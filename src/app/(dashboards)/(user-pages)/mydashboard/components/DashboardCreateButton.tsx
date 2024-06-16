import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import CreateDashboardModal from "@/components/modals/create-dashboard-modal/CreateDashboardModal";
import Image from "next/image";
import DashbaordLinkCard from "@/app/(dashboards)/(user-pages)/mydashboard/components/DashbaordLinkCard";

export default function DashboardCreateButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DashbaordLinkCard className="justify-center gap-3 font-semibold hover:cursor-pointer">
          <span>새로운 대시보드</span>
          <Image
            src={"/purple-add-box.svg"}
            alt="add new dashboard"
            width={22}
            height={22}
          />
        </DashbaordLinkCard>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-7 bg-gray-50">
        <CreateDashboardModal />
      </AlertDialogContent>
    </AlertDialog>
  );
}
