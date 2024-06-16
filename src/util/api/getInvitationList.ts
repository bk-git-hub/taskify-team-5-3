import { serverSideFetcher } from "@/lib/utils";

export default async function getInvitationList(title?: string) {
  const url = "https://sp-taskify-api.vercel.app/5-3/invitations";
  const res = await serverSideFetcher(url);
  const data = await res?.json();
  return data.invitations;
}
