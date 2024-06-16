import { serverSideFetcher } from "@/lib/utils";
import { IColumn } from "@/type";
import Column from "../column/Column";
import { AddColumnButton } from "../add-column-button/AddColumnButton";

async function getColumns(dashboardId: number) {
  const response = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/columns?dashboardId=${dashboardId}`,
  );
  const data = await response?.json();
  return data.data;
}

export default async function Columns({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const columns = await getColumns(dashboardId);
  if (!columns) {
    return;
  }
  return (
    <div className="w-full overflow-auto">
      <ul className="flex bg-[#FAFAFA] overflow-auto h-full">
        {columns.map((column: IColumn) => (
          <li
            key={column.id}
            className="box-border border-r-2 border-[#EEEEEE] "
          >
            <Column column={column} />
          </li>
        ))}
        <div className="fixed bottom-10 right-10">
          <AddColumnButton dashboardId={dashboardId} />
        </div>
      </ul>
    </div>
  );
}
