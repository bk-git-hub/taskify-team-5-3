import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { ProfileFormData } from "./_components/ProfileFormData";
import Link from "next/link";
import { PasswordForm } from "./_components/PasswordForm";
import { Toaster } from "@/components/ui/toaster";

export default function Mypage() {
  return (
    <main className="h-dvh w-full bg-[#FAFAFA] p-5">
      <div>
        <Button className="p-0 text-base" variant="ghost">
          <Link href="/mydashboard" className="flex gap-1">
            <ChevronLeftIcon className="size-6 stroke-[1.5]" />
            돌아가기
          </Link>
        </Button>
        <div className="mt-6 flex flex-col gap-3">
          <ProfileFormData />
          <PasswordForm />
        </div>
        <Toaster />
      </div>
    </main>
  );
}
