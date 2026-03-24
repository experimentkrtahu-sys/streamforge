import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export async function getHomepageData() {
  const [hero, trending, latest, recent, topRated, genres] = await Promise.all([
    prisma.homepageFeature.findMany({ where: { section: "hero" }, include: { show: true }, orderBy: { sortOrder: "asc" }, take: 5 }),
    prisma.show.findMany({ where: { isTrending: true }, take: 12, orderBy: { updatedAt: "desc" } }),
    prisma.show.findMany({ where: { isLatestRelease: true }, take: 12, orderBy: { releaseYear: "desc" } }),
    prisma.show.findMany({ where: { isRecentlyAdded: true }, take: 12, orderBy: { createdAt: "desc" } }),
    prisma.show.findMany({
      take: 12,
      orderBy: {
        ratings: { _count: "desc" }
      }
    }),
    prisma.genre.findMany({ include: { shows: { include: { show: true }, take: 12 } } })
  ]);

  return {
    hero: hero.map((h) => h.show),
    trending,
    latest,
    recent,
    topRated,
    genreRows: genres.map((g) => ({ name: g.name, shows: g.shows.map((s) => s.show) }))
  };
}

export type BrowseParams = {
  q?: string;
  genre?: string;
  type?: string;
  status?: string;
  year?: string;
  language?: string;
  sort?: "latest" | "popular" | "rating" | "az";
  page?: string;
};

export async function browseShows(params: BrowseParams) {
  const page = Number(params.page || 1);
  const take = 18;
  const where: Prisma.ShowWhereInput = {
    AND: [
      params.q
        ? {
            OR: [
              { title: { contains: params.q, mode: "insensitive" } },
              { altTitles: { hasSome: [params.q] } }
            ]
          }
        : {},
      params.genre ? { genres: { some: { genre: { slug: params.genre } } } } : {},
      params.type ? { type: params.type as never } : {},
      params.status ? { status: params.status as never } : {},
      params.year ? { releaseYear: Number(params.year) } : {},
      params.language ? { language: { equals: params.language, mode: "insensitive" } } : {}
    ]
  };

  const orderBy: Prisma.ShowOrderByWithRelationInput =
    params.sort === "popular"
      ? { viewCount: "desc" }
      : params.sort === "rating"
      ? { ratings: { _count: "desc" } }
      : params.sort === "az"
      ? { title: "asc" }
      : { createdAt: "desc" };

  const [items, total] = await Promise.all([
    prisma.show.findMany({ where, orderBy, skip: (page - 1) * take, take }),
    prisma.show.count({ where })
  ]);

  return { items, page, totalPages: Math.ceil(total / take) };
}

export async function getShowBySlug(slug: string) {
  return prisma.show.findUnique({
    where: { slug },
    include: {
      genres: { include: { genre: true } },
      studios: { include: { studio: true } },
      producers: { include: { producer: true } },
      episodes: { orderBy: { episodeNumber: "asc" } },
      recommendationsFrom: { include: { recommendedShow: true } }
    }
  });
}

export async function getWatchEpisode(showSlug: string, episodeNumber: number) {
  return prisma.episode.findFirst({
    where: { show: { slug: showSlug }, episodeNumber },
    include: {
      show: true,
      sources: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] }
    }
  });
}
