"use server";

import { getServerSession } from "next-auth";
import { API_URL } from "./ProfileFormData";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const save = async (formData: FormData) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const body = new FormData();

  const file = formData.get("file") as File;

  body.append("image", file);

  const { profileImageUrl } = await fetch(`${API_URL}/users/me/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: body,
  }).then<{ profileImageUrl: string }>((r) => r.json());

  const data = await fetch(`${API_URL}/users/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname: formData.get("name"),
      profileImageUrl,
    }),
  }).then<{ nickname: string }>((r) => r.json());

  console.log(data);
};
