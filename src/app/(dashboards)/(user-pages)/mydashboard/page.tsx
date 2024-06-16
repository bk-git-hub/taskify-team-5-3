import { Toaster } from "@/components/ui/toaster";
import DashboardCreateButton from "./components/DashboardCreateButton";
import DashboardPagination from "./components/DashboardPagination";
import InvitationBoard from "./components/InvitationBoard";

interface MyDashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function MyDashboardPage({
  searchParams,
}: MyDashboardPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="p-10 bg-gray-100 w-full  grow overflow-auto">
      <div className="flex flex-col w-[1022px] gap-11">
        <DashboardPagination pageNumber={currentPage} />
        <InvitationBoard />
        <Toaster />
      </div>
    </main>
  );
}
