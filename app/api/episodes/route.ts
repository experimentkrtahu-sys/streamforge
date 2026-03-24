import { SourceLanguage } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const form = await req.formData();
  const showId = String(form.get("showId"));
  const episodeNumber = Number(form.get("episodeNumber"));
  const title = String(form.get("title"));
  const slug = String(form.get("slug"));
  const thumbnailUrl = String(form.get("thumbnailUrl") || "");
  const embedUrl = String(form.get("embedUrl"));

  await prisma.episode.create({
    data: {
      showId,
      episodeNumber,
      title,
      slug,
      thumbnailUrl: thumbnailUrl || null,
      sources: { create: { label: "Main", embedUrl, isPrimary: true, language: SourceLanguage.SUB } }
    }
  });

  return NextResponse.redirect(new URL("/admin", req.url));
}
