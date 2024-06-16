"use client";

import { useState, useEffect } from "react";
import InvitationTuple from "./InvitationTuple";
import Image from "next/image";

type invitation = {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};
const decomposeHangul = (text: string) => {
  const CHO_SEONG = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const JUNG_SEONG = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const JONG_SEONG = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const result = [];

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 0xac00;
    if (code >= 0 && code <= 11172) {
      const cho = CHO_SEONG[Math.floor(code / 588)];
      const jung = JUNG_SEONG[Math.floor((code % 588) / 28)];
      const jong = JONG_SEONG[code % 28];
      result.push(cho, jung, jong);
    } else {
      result.push(text[i]);
    }
  }

  return result.join("");
};

export default function InvitationList({
  invitations,
}: {
  invitations: invitation[];
}) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredInvitations, setFilteredInvitations] = useState(invitations);

  useEffect(() => {
    if (searchInput === "") {
      setFilteredInvitations(invitations);
    } else {
      const searchDecomposed = decomposeHangul(searchInput).toLowerCase();

      setFilteredInvitations(
        invitations.filter(
          (invitation) =>
            decomposeHangul(invitation.inviter.nickname)
              .toLowerCase()
              .includes(searchDecomposed) ||
            decomposeHangul(invitation.dashboard.title)
              .toLowerCase()
              .includes(searchDecomposed),
        ),
      );
    }
  }, [searchInput, invitations]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="w-full border border-gray-300 px-4 py-2 rounded-md flex gap-2">
          <button type="submit">
            <Image src={"/dot-bo-ki.svg"} width={24} height={24} alt="search" />
          </button>
          <input
            className="border-none outline-none grow"
            placeholder={"검색"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="w-full grid grid-cols-3 text-gray-400">
          <span>대시보드 이름</span>
          <span>초대자</span>
          <span>수락여부</span>
        </div>
        <div className="flex flex-col h-full">
          <ul className="flex flex-col h-[432px] overflow-y-auto">
            {filteredInvitations
              .filter(
                (invitation: invitation) => invitation.inviteAccepted === null,
              )
              .map((invitation: invitation, index: number) => (
                <li
                  key={invitation.id}
                  className={`${
                    index !== filteredInvitations.length - 1 ? "border-b" : ""
                  } border-gray-300 py-2`}
                >
                  <InvitationTuple invitation={invitation} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
