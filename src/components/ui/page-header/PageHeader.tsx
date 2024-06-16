import { ReactNode } from "react";

export default function PageHeader({ children }: { children: ReactNode }) {
  return (
    <header className="pl-10 pr-20 py-6 flex justify-between items-center border-b border-[#d9d9d9]">
      {children}
    </header>
  );
}

function HeaderTitle({ children }: { children: ReactNode }) {
  return (
    <span className="text-xl font-bold flex flex-row items-center gap-2">
      {children}
    </span>
  );
}

PageHeader.Title = HeaderTitle;
