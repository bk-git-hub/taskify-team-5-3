import { redirect } from "next/navigation";
import ReturnButton from "@/components/return-button/ReturnButton";
import { DashboardEditForm } from "./components/DashboardEditForm";
import getDashboardData from "@/util/api/getDashboardData";
import MemberEdit from "./components/MemberEdit";
import InvitedList from "./components/InvitedList";
import DashboardDeleteButton from "./components/DashboardDeleteButton";

interface Props {
  params: { dashboardId: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DashboardEditPage({
  params,
  searchParams,
}: Props) {
  const dashboardData = await getDashboardData(params.dashboardId);
  const currentMemberPage = Number(searchParams?.memberPage) || 1;
  const currentInvitationPage = Number(searchParams?.invitationPage) || 1;

  console.log(dashboardData.id);
  if (!dashboardData.id) {
    redirect("/mydashboard");
  }

  return (
    <main className="flex flex-col p-5 bg-gray-100 gap-3 h-full overflow-auto">
      <ReturnButton href={`/dashboard/${params.dashboardId}`} />
      <div className="w-[620px] flex flex-col gap-3">
        <DashboardEditForm
          dashboardTitle={dashboardData.title}
          currentColor={dashboardData.color}
          dashboardId={params.dashboardId}
        />
        <MemberEdit
          memberPage={currentMemberPage}
          invitationPage={currentInvitationPage}
          dashboardId={params.dashboardId}
        />

        <InvitedList
          memberPage={currentMemberPage}
          invitationPage={currentInvitationPage}
          dashboardId={params.dashboardId}
        />
        <DashboardDeleteButton dashboardId={params.dashboardId} />
      </div>
    </main>
  );
}
