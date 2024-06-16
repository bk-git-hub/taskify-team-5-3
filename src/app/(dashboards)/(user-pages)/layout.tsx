import SideBar from "@/components/side-bar/SideBar";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row ">
      <SideBar />
      {children}
    </div>
  );
}
