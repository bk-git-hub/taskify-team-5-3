import { serverSideFetcher } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CustomAvatar from "../custom-avatar/CustomAvatar";

type member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isOwner: boolean;
};

async function getMembers(dashboardId: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/members?page=1&size=9999&dashboardId=${dashboardId}`,
  );
  const data = await res?.json();
  return data.members;
}

export default async function MemberBar({
  dashboardId,
}: {
  dashboardId: number;
}) {
  let members = await getMembers(dashboardId);

  const firstFourMembers = members.slice(0, 4);
  const afterFourMembers = members.slice(4);

  //   const firstTwoMembers = members.slice(0, 2);
  //   const afterTwoMembers = members.slice(2);

  return (
    <ul className="flex">
      {firstFourMembers.map((member: member) => (
        <li key={member.userId}>
          <Avatar className="-ml-2">
            <CustomAvatar
              imgUrl={member.profileImageUrl}
              nickname={member.nickname}
              userId={member.userId}
              size={38}
            />
          </Avatar>
        </li>
      ))}
      {afterFourMembers.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <li
              key={0}
              className="bg-[#f4d7da] text-[#de5b68] flex justify-center items-center w-10 h-10 z-40 -ml-2 border-2 border-white rounded-full font-medium"
            >
              +{afterFourMembers.length}
            </li>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-4 py-4">
            <ul className="flex flex-wrap w-40">
              {afterFourMembers.map((member: member) => (
                <li key={member.userId}>
                  <Avatar className="-mr-2">
                    <CustomAvatar
                      imgUrl={member.profileImageUrl}
                      nickname={member.nickname}
                      userId={member.userId}
                      size={38}
                    />
                  </Avatar>
                </li>
              ))}
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </ul>
  );
}
