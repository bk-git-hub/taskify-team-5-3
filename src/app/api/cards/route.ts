import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { CloudCog } from "lucide-react";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await req.json();
  console.log(body);

  // Send JSON data to the second endpoint
  const response2 = await fetch(`https://sp-taskify-api.vercel.app/5-3/cards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data2 = await response2.json();
  return new Response(JSON.stringify(data2), {
    status: response2.status,
  });
}
