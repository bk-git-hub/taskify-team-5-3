import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CardCreateForm } from "../card-create-form/CardCreateForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type CreateCardModalProps = {
  dashboardId: number;
  columnId: number;
};

export default async function CreateCardModal({
  dashboardId,
  columnId,
}: CreateCardModalProps) {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/members?dashboardId=${dashboardId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );
  const data = await response.json();
  const members = data.members;

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>할 일 생성</AlertDialogTitle>
      </AlertDialogHeader>
      <CardCreateForm
        dashboardId={dashboardId}
        columnId={columnId}
        members={members}
      />
    </>
  );
}
