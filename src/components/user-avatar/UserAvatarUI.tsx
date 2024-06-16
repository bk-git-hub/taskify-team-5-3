"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import CustomAvatar from "../custom-avatar/CustomAvatar";
import { Avatar } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function UserAvatarUI({ userData }: { userData: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className="flex gap-3 pl-6 items-center border-l border-[#d9d9d9]">
          <Avatar>
            <CustomAvatar
              imgUrl={userData.profileImageUrl}
              nickname={userData.nickname}
              userId={userData.id}
              size={38}
            />
          </Avatar>
          <span className="font-medium">{userData.nickname}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn("focus:bg-[#f1effd] focus:text-[#5534da]")}
        >
          <Link href={"/mypage"}>마이페이지</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(" focus:bg-[#f1effd] focus:text-[#5534da]")}
          onClick={() => signOut()}
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
