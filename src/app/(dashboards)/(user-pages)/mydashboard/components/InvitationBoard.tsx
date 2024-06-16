import getInvitationList from "@/util/api/getInvitationList";
import InvitationList from "./InvitationList";
import NoInvitations from "./NoInvitations";
import { cn } from "@/lib/utils";

export default async function InvitationBoard() {
  const invitations = await getInvitationList();

  return (
    <div
      className={cn(
        "px-7 py-8 flex flex-col gap-5 bg-white rounded-lg",
        invitations.length > 0 ? "h-[600px]" : "h-[400px]",
      )}
    >
      <span className="text-2xl font-bold">초대받은 대시보드</span>
      {invitations.length > 0 ? (
        <InvitationList invitations={invitations} />
      ) : (
        <NoInvitations />
      )}
    </div>
  );
}
