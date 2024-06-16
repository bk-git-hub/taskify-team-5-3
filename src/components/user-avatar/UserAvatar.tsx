import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { serverSideFetcher } from "@/lib/utils";
import { cn } from "@/lib/utils";
import CustomAvatar from "../custom-avatar/CustomAvatar";
import { Avatar } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import UserAvatarUI from "./UserAvatarUI";

async function getUserInfo() {
  const response = await serverSideFetcher(
    "https://sp-taskify-api.vercel.app/5-3/users/me",
  );
  const data = await response?.json();
  return data;
}

export default async function UserAvatar({}) {
  const userData = await getUserInfo();

  return <UserAvatarUI userData={userData} />;
}
