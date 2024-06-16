import Image from "next/image";

type dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
};

export default function DashboardLabel({
  dashboard,
}: {
  dashboard: dashboard;
}) {
  return (
    <div className="flex items-center">
      <div
        style={{ backgroundColor: dashboard.color }}
        className={`w-[8px] h-[8px] rounded-full`}
      ></div>
      <span className="ml-[16px] mr-[6px] text-[18px] leading-[21px]  font-medium">
        {dashboard.title}
      </span>
      {dashboard.createdByMe && (
        <Image
          src="/crown_icon.png"
          alt="내가 생성한 대시보드"
          width={18}
          height={14}
        />
      )}
    </div>
  );
}
