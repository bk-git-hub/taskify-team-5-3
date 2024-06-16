import Columns from "./components/columns/Columns";

interface Props {
  params: { dashboardId: number };
}

export default async function Page({ params }: Props) {
  return (
    <div className="flex flex-row h-full ">
      <Columns dashboardId={params.dashboardId} />
    </div>
  );
}
