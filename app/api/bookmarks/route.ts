import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { showId } = (await req.json()) as { showId: string };
  await prisma.bookmark.upsert({
    where: { userId_showId: { userId: session.user.id, showId } },
    create: { userId: session.user.id, showId },
    update: {}
  });
  return NextResponse.json({ ok: true });
}
