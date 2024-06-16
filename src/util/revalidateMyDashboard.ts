"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateMyDashboard() {
  revalidatePath("/mydashboard");
}
