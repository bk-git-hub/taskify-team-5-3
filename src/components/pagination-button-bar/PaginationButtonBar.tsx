import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
interface Props {
  prevPage: string;
  nextPage: string;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export default function PaginationButtonBar({
  prevPage,
  nextPage,
  isFirstPage,
  isLastPage,
}: Props) {
  return (
    <>
      <Link href={prevPage}>
        <button
          disabled={isFirstPage}
          className="border border-gray-300 p-2.5 rounded-l-lg flex"
        >
          <ChevronLeft
            className={cn(
              {
                "text-gray-300": isFirstPage,
                "text-black": !isFirstPage,
              },
              "w-9 h-9",
            )}
          />
        </button>
      </Link>
      <Link href={nextPage}>
        <button
          disabled={isLastPage}
          className="border border-gray-300 p-2.5 rounded-r-lg flex"
        >
          <ChevronRight
            className={cn(
              {
                "text-gray-300": isLastPage,
                "text-black": !isLastPage,
              },
              "w-9 h-9",
            )}
          />
        </button>
      </Link>
    </>
  );
}
