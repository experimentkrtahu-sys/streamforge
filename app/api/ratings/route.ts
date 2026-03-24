import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { showId, score, reviewText } = (await req.json()) as { showId: string; score: number; reviewText?: string };
  await prisma.rating.upsert({
    where: { userId_showId: { userId: session.user.id, showId } },
    create: { showId, userId: session.user.id, score, reviewText },
    update: { score, reviewText }
  });
  return NextResponse.json({ ok: true });
}
