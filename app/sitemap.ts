import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const shows = await prisma.show.findMany({ select: { slug: true, updatedAt: true } });
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/browse`, lastModified: new Date() },
    ...shows.map((show) => ({ url: `${base}/shows/${show.slug}`, lastModified: show.updatedAt }))
  ];
}
