import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { columnId: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const columnId = params.columnId;
  console.log(columnId);
  if (!columnId) {
    return NextResponse.json(
      { message: "memberId is required" },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/columns/${columnId}`,
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
