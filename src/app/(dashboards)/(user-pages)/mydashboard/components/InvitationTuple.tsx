"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import revalidate from "@/util/revalidate";
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

export default function InvitationTuple({
  invitation,
}: {
  invitation: invitation;
}) {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAccept = async (accepted: boolean) => {
    try {
      const response = await fetch("/api/dashboards/invitations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invitationId: invitation.id,
          accepted: accepted,
        }),
      });

      if (response.ok) {
        await revalidate();
        const msg = `초대가 ${accepted ? "수락" : "거절"} 되었습니다`;
        toast({
          description: msg,
        });
      } else {
        const msg = `대충 뭔가 문제 발생`;
        toast({
          description: msg,
        });
      }
    } catch (error) {
      const msg = `에러 블라블라`;
      toast({
        description: msg,
      });
    } finally {
      setIsAcceptDialogOpen(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-3 items-center py-5">
      <span>{invitation.dashboard.title}</span>
      <span>{invitation.inviter.nickname}</span>
      <div className="flex gap-3 text-sm">
        <AlertDialog
          open={isAcceptDialogOpen}
          onOpenChange={setIsAcceptDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <button
              onClick={() => setIsAcceptDialogOpen(true)}
              className="text-white px-7 bg-violet-100 rounded h-8 hover:bg-purple-600"
            >
              수락
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-50">
            <div className="w-full flex flex-col items-center">
              <Image
                src={"/accept.jpg"}
                alt={"uncle-sam"}
                width={400}
                height={400}
                objectFit="contain"
              />
              초대를 수락하시겠습니까?
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button
                  onClick={() => setIsAcceptDialogOpen(false)}
                  className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]"
                >
                  취소
                </button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={() => handleAccept(true)}
                  className="bg-violet-100 text-white px-[46px] py-3.5 rounded-lg hover:bg-purple-600"
                >
                  수락
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog
          open={isRejectDialogOpen}
          onOpenChange={setIsRejectDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <button
              onClick={() => setIsRejectDialogOpen(true)}
              className="rounded border border-gray-300 px-7 h-8"
            >
              거절
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-50">
            <div className="w-full flex flex-col items-center">
              <Image
                src={"/uncle-sam.png"}
                alt={"uncle-sam"}
                width={200}
                height={200}
                objectFit="contain"
              />
              초대를 거절하시겠습니까?
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button
                  onClick={() => setIsRejectDialogOpen(false)}
                  className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]"
                >
                  취소
                </button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={() => handleAccept(false)}
                  className="bg-red-500 text-white px-[46px] py-3.5 rounded-lg hover:bg-red-600"
                >
                  거절
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
