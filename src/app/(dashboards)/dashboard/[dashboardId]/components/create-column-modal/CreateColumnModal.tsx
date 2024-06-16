import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ColumnCreateForm } from "../column-create-form/ColumnCreateForm";
import { serverSideFetcher } from "@/lib/utils";

async function getColumns(dashboardId: number) {
  const response = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/columns?dashboardId=${dashboardId}`,
  );
  const data = await response?.json();
  return data.data;
}

export default async function CreateColumnModal({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const columns = await getColumns(dashboardId);
  const titles = columns.map((item: any) => item.title);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>새 컬럼 생성</AlertDialogTitle>
      </AlertDialogHeader>
      <ColumnCreateForm dashboardId={dashboardId} titles={titles} />
    </>
  );
}
