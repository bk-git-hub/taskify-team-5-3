import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICard, IColumn, Member } from "@/type";
import Image from "next/image";
import CardTag from "../card-tag/CardTag";
import { CommentForm } from "../comment-form/CommentForm";
import CommentList from "../comment-list/CommentList";

import CustomAvatar from "@/components/custom-avatar/CustomAvatar";
import { Avatar } from "@/components/ui/avatar";
import formatDate from "@/util/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  cardData?: ICard;
  column?: IColumn;
  comments?: any;
  members?: Member[];
};

import CardDropDown from "./CardDropDown";
import { useState } from "react";

import Jeb from "./Jeb";

export function CardList({ children }: CardProps) {
  return <div className="flex flex-col gap-4 overflow-auto">{children}</div>;
}

export function Card({
  children,
  cardData,
  column,
  comments,
  members,
}: CardProps) {
  if (!cardData || !column || !members) return null;
  return (
    <>
      <Jeb
        cardData={cardData}
        column={column}
        comments={comments}
        members={members}
      >
        {children}
      </Jeb>
    </>
  );
}

Card.Header = function CardHeader({ children }: CardProps) {
  return <div>{children}</div>;
};

Card.Content = function CardContent({ children }: CardProps) {
  return <div className="flex flex-col gap-2.5">{children}</div>;
};

Card.Footer = function CardFooter({ children }: CardProps) {
  return <div className="flex justify-between">{children}</div>;
};

Card.Title = function CardTitle({ children }: CardProps) {
  return <h2 className="text-[#333236] text-[16px] font-medium">{children}</h2>;
};

Card.Tag = function CardTag({ children }: CardProps) {
  return (
    <ul className="flex flex-row gap-2 flex-wrap items-center">{children}</ul>
  );
};

Card.TagBackground = function CardTagBackground({
  children,
  style,
}: CardProps) {
  return (
    <div className="border-[1.25px] rounded" style={style}>
      {children}
    </div>
  );
};

Card.TagName = function CardTag({ children }: CardProps) {
  return (
    <li className="text-xs font-normal px-1.5 py-1 rounded">{children}</li>
  );
};

Card.DueDate = function CardDueDate({ children }: CardProps) {
  return (
    <div className="flex gap-2 text-[#787486] items-center">
      <Image src="/calendar.svg" alt="calendar" width={18} height={18} />
      {children}
    </div>
  );
};

Card.Asignee = function CardAsignee({ assignee }: { assignee: any }) {
  return (
    <Avatar>
      <CustomAvatar
        size={24}
        nickname={assignee.nickname}
        userId={assignee.id}
        imgUrl={assignee.profileImageUrl}
      />
    </Avatar>
  );
};
