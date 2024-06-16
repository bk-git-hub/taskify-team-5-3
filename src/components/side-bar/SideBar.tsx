import { serverSideFetcher } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import CreateDashboardModal from "../modals/create-dashboard-modal/CreateDashboardModal";
import DashboardLabel from "../ui/dashboard-label/DashboardLabel";

interface Props {
  selectedId?: number;
}

type dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
};

async function getDashBoards() {
  const response = await serverSideFetcher(
    "https://sp-taskify-api.vercel.app/5-3/dashboards?navigationMethod=infiniteScroll&page=1&size=9999",
  );
  const data = await response?.json();
  return data.dashboards;
}

export default async function SideBar({ selectedId }: Props) {
  const dashboards = await getDashBoards();
  if (!dashboards) return;
  return (
    <div className="flex flex-col w-[300px] h-[100vh] px-[12px] border border-[#d9d9d9] shrink-0">
      <Link href="/mydashboard" className="py-[20px] px-[12px]">
        <Image src="/taskify.png" width={110} height={33} alt="Taskify" />
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="px-3 py-4 text-xs font-bold text-[#787486] flex justify-between items-center hover:bg-[#d9d9d9] rounded">
            <span>Dashboards</span>
            <Image
              src={"/add_box.svg"}
              alt="add new dashboard"
              width={20}
              height={20}
            />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-7">
          <CreateDashboardModal />
        </AlertDialogContent>
      </AlertDialog>
      <ul className="flex flex-col gap-5 overflow-y-auto">
        {dashboards.map((dashboard: dashboard) => (
          <li key={dashboard.id}>
            <Link
              href={`/dashboard/${dashboard.id}`}
              className={
                selectedId == dashboard.id
                  ? "bg-[#F1EFFD] rounded px-3 py-3 flex flex-row items-center"
                  : "px-3 py-3 hover:bg-[#f1effd] flex flex-row items-center"
              }
            >
              <DashboardLabel dashboard={dashboard} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
