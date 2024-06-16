import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const dashboardId = Number(body.dashboardId);

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/dashboards/${dashboardId}/invitations`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: body.email }),
    },
  );

  const data = await backendResponse.json();

  return NextResponse.json(data, { status: backendResponse.status });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  console.log(body);
  const invitationId = Number(body.invitationId);
  const inviteAccepted = body.accepted;
  console.log(inviteAccepted);

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/invitations/${invitationId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteAccepted }),
    },
  );

  const data = await backendResponse.json();

  return NextResponse.json(data, { status: backendResponse.status });
}
