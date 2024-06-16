import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { cardId: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const cardId = params.cardId;
  console.log(cardId);
  if (!cardId) {
    return NextResponse.json(
      { message: "cardId is required" },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/cards/${cardId}`,
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

export async function PUT(
  req: Request,
  { params }: { params: { cardId: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const cardId = params.cardId;
  console.log(cardId);
  if (!cardId) {
    return NextResponse.json(
      { message: "cardId is required" },
      { status: 400 },
    );
  }
  const body = await req.json();
  console.log(cardId);
  console.log(body);

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/cards/${cardId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await backendResponse.json();

  return NextResponse.json(data, { status: backendResponse.status });
}
