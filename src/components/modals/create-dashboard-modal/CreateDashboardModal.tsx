import { DashboardCreateForm } from "@/components/dashboard-create-form/DashboardCreateForm";
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CreateDashboardModal() {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>새로운 대시보드</AlertDialogTitle>
      </AlertDialogHeader>
      <DashboardCreateForm />
    </>
  );
}
