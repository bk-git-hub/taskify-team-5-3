import { serverSideFetcher } from "@/lib/utils";

export async function getPageMembers(pageNumber: number, dashboardId: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/members?page=${pageNumber}&size=4&dashboardId=${dashboardId}`,
  );
  const data = await res?.json();
  return data;
}
