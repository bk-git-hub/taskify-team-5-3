import DashboardToolBar from "@/components/dashboard-tool-bar/DashboardToolBar";
import MemberBar from "@/components/member-bar/MemberBar";
import SideBar from "@/components/side-bar/SideBar";
import PageHeader from "@/components/ui/page-header/PageHeader";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import getDashboardData from "@/util/api/getDashboardData";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
interface Props {
  params: { dashboardId: number };
  children: React.ReactNode;
}

export default async function DashboardPageLayout({ params, children }: Props) {
  const dashboard = await getDashboardData(params.dashboardId);

  return (
    <div className="flex flex-row h-full">
      <SideBar selectedId={params?.dashboardId} />
      <div className="w-full overflow-auto">
        <div className="flex flex-col h-screen">
          <PageHeader>
            <div className="flex grow justify-between pr-8">
              <PageHeader.Title>
                {dashboard.title}
                {dashboard.createdByMe && (
                  <Image
                    src={"/crown_icon.png"}
                    width={20}
                    height={16}
                    alt="created by me"
                  />
                )}
              </PageHeader.Title>
              <div className="flex gap-10 items-center">
                {dashboard.createdByMe && (
                  <DashboardToolBar dashboardId={params.dashboardId} />
                )}
                <MemberBar dashboardId={params.dashboardId} />
              </div>
            </div>
            <UserAvatar />
          </PageHeader>
          <div className="h-full overflow-auto">
            {children}
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
