import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileFormProvider } from "./ProfileFormProvider";

export const API_URL = "https://sp-taskify-api.vercel.app/5-3";

export async function ProfileFormData() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const data: Response = await res.json();

  let prevProfileImageUrl = "";

  const defaultValues = {
    email: data.email,
    name: data.nickname,
    profileURL: data.profileImageUrl || prevProfileImageUrl,
  };

  prevProfileImageUrl = defaultValues.profileURL;

  return <ProfileFormProvider defaultValues={defaultValues} />;
}

export interface Response {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
