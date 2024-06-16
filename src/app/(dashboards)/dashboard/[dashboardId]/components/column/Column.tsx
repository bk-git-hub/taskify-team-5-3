import { serverSideFetcher } from "@/lib/utils";
import { IColumn } from "@/type";
import { ColumnHeader } from "@/app/(dashboards)/dashboard/[dashboardId]/components/column-header/ColumnHeader";
import Cards from "../cards/Cards";
import AddCardButton from "../add-card-button/AddCardButton";
import { EditColumnButton } from "../edit-column-buttom/EditColumnButton";

async function getColumn(colunmId: number) {
  const response = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/cards?columnId=${colunmId}`,
  );
  const data = await response?.json();
  return data;
}

export default async function Column({ column }: { column: IColumn }) {
  const columnData = await getColumn(column.id);

  return (
    <>
      <div key={column.id} className="flex flex-col gap-4 h-full p-5">
        <ColumnHeader>
          <ColumnHeader.Content>
            <ColumnHeader.Ellipse />
            <ColumnHeader.Text>{column.title}</ColumnHeader.Text>
            <ColumnHeader.CardCount>
              {columnData.totalCount}
            </ColumnHeader.CardCount>
          </ColumnHeader.Content>
          <EditColumnButton title={column.title} columnId={column.id} />
        </ColumnHeader>
        <AddCardButton dashboardId={column.dashboardId} columnId={column.id} />
        <Cards cards={columnData.cards} column={column} />
      </div>
    </>
  );
}
