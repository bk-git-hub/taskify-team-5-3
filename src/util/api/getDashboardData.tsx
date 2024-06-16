import { serverSideFetcher } from "@/lib/utils";

export default async function getDashboardData(dashboardId: number) {
  const response = await serverSideFetcher(
    `https:///sp-taskify-api.vercel.app/5-3/dashboards/${dashboardId}`,
  );
  const data = await response?.json();
  return data;
}
