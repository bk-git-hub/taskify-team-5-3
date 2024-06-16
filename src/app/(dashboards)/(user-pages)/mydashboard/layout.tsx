import PageHeader from "@/components/ui/page-header/PageHeader";
import UserAvatar from "@/components/user-avatar/UserAvatar";

export default function MyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-screen">
      <PageHeader>
        <PageHeader.Title>내 대시보드</PageHeader.Title>
        <UserAvatar />
      </PageHeader>
      {children}
    </div>
  );
}
