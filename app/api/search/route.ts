import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const items = await prisma.show.findMany({
    where: { OR: [{ title: { contains: q, mode: "insensitive" } }, { altTitles: { hasSome: [q] } }] },
    select: { id: true, slug: true, title: true, posterUrl: true },
    take: 8
  });
  return NextResponse.json({ items });
}
