export default function ToolBarButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#d9d9d9] font-medium flex gap-2 px-4 py-[10px] rounded-lg hover:cursor-pointer">
      {children}
    </div>
  );
}
