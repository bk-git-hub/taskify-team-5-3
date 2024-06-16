import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";
import { NameInput } from "./NameInput";
import { EmailInput } from "./EmailInput";
import { ProfileImage } from "./ProfileImage";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";
import { FormValues } from "./ProfileFormProvider";

type Props = {
  control: Control<FormValues>;
};

export function ProfileForm({ control }: Props) {
  const { pending } = useFormStatus();

  return (
    <fieldset
      disabled={pending}
      className="flex max-w-[620px] flex-col gap-6 rounded-lg bg-white px-7 py-8"
    >
      <h2 className="font-semibold text-[#333236] text-2xl ">프로필</h2>
      <div className="flex gap-4">
        <ProfileImage control={control} />
        <div className="flex grow flex-col gap-3 justify-start">
          <EmailInput control={control} />
          {/* <div className="grow"></div> */}
          <NameInput control={control} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="h-8 w-20 bg-[#5534DA] hover:bg-[#5534DA]/80"
        >
          {pending ? <Loader2Icon className="size-5 animate-spin" /> : "저장"}
        </Button>
      </div>
    </fieldset>
  );
}
