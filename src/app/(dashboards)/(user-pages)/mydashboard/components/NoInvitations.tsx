import Image from "next/image";

export default function NoInvitations({
  message = "아직 초대받은 대시보드가 없어요",
}) {
  return (
    <div className="flex flex-col justify-center items-center p-[66px] gap-6">
      <Image
        src={"/no-invitation.svg"}
        alt="no invitations"
        width={100}
        height={100}
      />
      <span className="text-lg text-gray-400">{message}</span>
    </div>
  );
}
