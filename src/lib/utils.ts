import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function serverSideFetcher(url: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const accessToken = session.accessToken;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}
