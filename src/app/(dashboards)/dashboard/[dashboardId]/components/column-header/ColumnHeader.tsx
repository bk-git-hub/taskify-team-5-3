import Image from "next/image";

type ColumnProps = {
  children: React.ReactNode;
};

export function ColumnHeader({ children }: ColumnProps) {
  return (
    <div className="flex justify-between items-center w-[314px]">
      {children}
    </div>
  );
}

ColumnHeader.Content = function ColumnHeaderContent({ children }: ColumnProps) {
  return <div className="flex items-center">{children}</div>;
};

ColumnHeader.Text = function ColumnHeaderText({ children }: ColumnProps) {
  return (
    <span className="flex justify-center items-center mr-3 text-lg font-bold text-black">
      {children}
    </span>
  );
};
ColumnHeader.CardCount = function ColumnHeaderCardCount({
  children,
}: ColumnProps) {
  return (
    <div className="flex justify-center items-center w-5 h-5 bg-[#EEEEEE] text-[12px] text-[#787486] font-medium rounded">
      {children}
    </div>
  );
};

ColumnHeader.SettingLogo = function ColumnHeaderSettingLogo() {
  return <Image src="/settings.svg" alt="settings" width={24} height={24} />;
};

ColumnHeader.Ellipse = function ColumnHeaderColor() {
  return (
    <Image
      src="/violet-ellipse.svg"
      alt="ellipse"
      width={8}
      height={8}
      className="mr-2"
    />
  );
};
