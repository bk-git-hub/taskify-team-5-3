import PaginationButtonBar from "@/components/pagination-button-bar/PaginationButtonBar";
import { getPageInvited } from "@/util/api/getPageInvited";

import NoInvitations from "@/app/(dashboards)/(user-pages)/mydashboard/components/NoInvitations";
import DashboardInvitedTuple from "./DashboardInvitedTuple";
import InviteModal from "@/components/modals/invite-modal/InviteModal";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface Props {
  memberPage: number;
  invitationPage: number;
  dashboardId: number;
}

export default async function InvitedList({
  memberPage,
  invitationPage,
  dashboardId,
}: Props) {
  const { invitations, totalCount } = await getPageInvited(
    invitationPage,
    dashboardId,
  );
  const maxPage = Math.max(1, Math.ceil(totalCount / 4));

  const isLastInvitationPage = invitationPage === maxPage;
  const isFirstInvtationPage = invitationPage === 1;
  const currentUrl = `/dashboard/${dashboardId}/edit`;

  return (
    <div className="rounded-lg bg-white p-7 flex flex-col h-[460px]">
      <div className="w-full flex justify-between items-center">
        <span className="text-2xl font-bold">초대내역</span>

        <div className="flex items-center gap-4">
          {invitations.length > 0 && (
            <>
              <span>
                {memberPage} / {maxPage}
              </span>
              <div className="flex">
                <PaginationButtonBar
                  isFirstPage={isFirstInvtationPage}
                  isLastPage={isLastInvitationPage}
                  prevPage={`${currentUrl}?memberPage=${memberPage}&invitationPage=${
                    invitationPage - 1
                  }`}
                  nextPage={`${currentUrl}?memberPage=${memberPage}&invitationPage=${
                    invitationPage + 1
                  }`}
                />
              </div>
            </>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="bg-violet-100 text-white text-sm px-4 py-2 flex gap-2 items-center rounded">
                <Image
                  src={"/white-add-box.svg"}
                  width={16}
                  height={16}
                  alt="초대하기"
                />
                초대하기
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <InviteModal dashboardId={dashboardId} />
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {invitations.length > 0 ? (
        <>
          <span className="text-gray-400 mt-7">이메일</span>
          <ul>
            {invitations.map((invitation: any, index: number) => (
              <li
                key={index}
                className={`py-4 flex justify-between ${
                  index !== invitations.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <DashboardInvitedTuple
                  email={invitation.invitee.email}
                  invitationId={invitation.id}
                  dashboardId={dashboardId}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NoInvitations message="초대한 내역이 존재하지 않습니다" />
      )}
    </div>
  );
}
