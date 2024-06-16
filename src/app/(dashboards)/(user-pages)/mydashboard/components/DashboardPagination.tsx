import { getPageDashbaords } from "@/util/api/getPageDashboards";
import DashboardCreateButton from "./DashboardCreateButton";
import DashbaordLinkCard from "@/app/(dashboards)/(user-pages)/mydashboard/components/DashbaordLinkCard";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardLabel from "@/components/ui/dashboard-label/DashboardLabel";
import PaginationButtonBar from "@/components/pagination-button-bar/PaginationButtonBar";
interface DashboardPaginationProps {
  pageNumber: number;
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

export default async function DashboardPagination({
  pageNumber,
}: DashboardPaginationProps) {
  const data = await getPageDashbaords(pageNumber);
  const maxPage = Math.ceil(data.totalCount / 5);

  const isLastPage = pageNumber === maxPage;
  const isFirstPage = pageNumber === 1;
  const hasDashboard = data.totalCount > 0;

  return (
    <div className="flex flex-col gap-3">
      <ul className="grid grid-cols-3 gap-3">
        <li key="-1">
          <DashboardCreateButton />
        </li>
        {hasDashboard &&
          data.dashboards.map((dashboard: dashboard, index: number) => (
            <li key={index}>
              <DashbaordLinkCard>
                <Link
                  href={`/dashboard/${dashboard.id}`}
                  className="w-full flex justify-between items-center"
                >
                  <DashboardLabel dashboard={dashboard} />
                  <ChevronRight className="text-black w-[18px] h-[18px]" />
                </Link>
              </DashbaordLinkCard>
            </li>
          ))}
      </ul>

      {hasDashboard && (
        <div className=" flex items-center gap-4 self-end">
          <span>
            {pageNumber} / {maxPage}
          </span>

          <div className="flex bg-white">
            <PaginationButtonBar
              prevPage={`/mydashboard/?page=${pageNumber - 1}`}
              nextPage={`/mydashboard/?page=${pageNumber + 1}`}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
