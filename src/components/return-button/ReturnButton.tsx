import Link, { LinkProps } from "next/link";
import { ChevronLeft } from "lucide-react";
interface Props extends LinkProps {}

export default function ReturnButton({ href }: Props) {
  return (
    <Link href={href} className="flex gap-1.5 items-center">
      <ChevronLeft width={20} height={20} className="text-black" />
      <span className="font-medium">돌아가기</span>
    </Link>
  );
}
