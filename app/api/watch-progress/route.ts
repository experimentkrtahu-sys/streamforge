import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { showId, episodeId, progressSeconds, completed } = (await req.json()) as { showId: string; episodeId: string; progressSeconds: number; completed: boolean };
  await prisma.watchHistory.upsert({
    where: { userId_episodeId: { userId: session.user.id, episodeId } },
    create: { userId: session.user.id, showId, episodeId, progressSeconds, completed },
    update: { progressSeconds, completed, lastWatchedAt: new Date() }
  });
  return NextResponse.json({ ok: true });
}
