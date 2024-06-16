import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const invitationId = req.nextUrl.searchParams.get("invitationId");
  const dashboardId = req.nextUrl.searchParams.get("dashboardId");

  if (!invitationId || !dashboardId) {
    return NextResponse.json(
      { message: "invitationId and dashboardId are required" },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/dashboards/${dashboardId}/invitations/${invitationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const resStatus =
    backendResponse.status === 204 ? 201 : backendResponse.status;
  const resMessage = backendResponse.status === 204 ? "삭제 성공" : "삭제 실패";
  return NextResponse.json({ message: resMessage }, { status: resStatus });
}
