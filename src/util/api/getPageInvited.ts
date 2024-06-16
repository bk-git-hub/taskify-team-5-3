import { serverSideFetcher } from "@/lib/utils";

export async function getPageInvited(pageNumber: number, dashboardId: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/dashboards/${dashboardId}/invitations?page=${pageNumber}&size=4`,
  );
  const data = await res?.json();
  return data;
}
