import { PrismaClient, ShowStatus, ShowType, SourceLanguage, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hash("Admin123!", 12);

  const [action, fantasy, drama, sciFi] = await Promise.all([
    prisma.genre.upsert({ where: { slug: "action" }, update: {}, create: { name: "Action", slug: "action" } }),
    prisma.genre.upsert({ where: { slug: "fantasy" }, update: {}, create: { name: "Fantasy", slug: "fantasy" } }),
    prisma.genre.upsert({ where: { slug: "drama" }, update: {}, create: { name: "Drama", slug: "drama" } }),
    prisma.genre.upsert({ where: { slug: "sci-fi" }, update: {}, create: { name: "Sci-Fi", slug: "sci-fi" } })
  ]);

  const studio = await prisma.studio.upsert({ where: { slug: "aurora-studio" }, update: {}, create: { name: "Aurora Studio", slug: "aurora-studio" } });
  const producer = await prisma.producer.upsert({ where: { slug: "northlight-productions" }, update: {}, create: { name: "Northlight Productions", slug: "northlight-productions" } });

  await prisma.user.upsert({
    where: { email: "admin@streamforge.local" },
    update: {},
    create: {
      email: "admin@streamforge.local",
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      profile: { create: { displayName: "Platform Admin" } }
    }
  });

  const show = await prisma.show.upsert({
    where: { slug: "skyline-chronicles" },
    update: {},
    create: {
      slug: "skyline-chronicles",
      title: "Skyline Chronicles",
      altTitles: ["City of Echoes"],
      synopsis: "A team of urban explorers uncovers forgotten technology hidden beneath a floating megacity.",
      releaseYear: 2025,
      status: ShowStatus.ONGOING,
      type: ShowType.SERIES,
      totalEpisodes: 12,
      language: "Japanese",
      posterUrl: "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
      bannerUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
      isTrending: true,
      isLatestRelease: true,
      isRecentlyAdded: true,
      genres: { create: [{ genreId: action.id }, { genreId: sciFi.id }] },
      studios: { create: [{ studioId: studio.id }] },
      producers: { create: [{ producerId: producer.id }] },
      episodes: {
        create: [
          {
            slug: "episode-1",
            episodeNumber: 1,
            title: "Signal in the Cloud",
            thumbnailUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85",
            releaseDate: new Date("2025-10-01"),
            sources: {
              create: [
                {
                  label: "Main",
                  embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                  externalWatchUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  language: SourceLanguage.SUB,
                  qualityLabel: "1080p",
                  isPrimary: true
                }
              ]
            }
          },
          {
            slug: "episode-2",
            episodeNumber: 2,
            title: "Underground Archive",
            thumbnailUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
            releaseDate: new Date("2025-10-08"),
            sources: {
              create: [
                {
                  label: "Main",
                  embedUrl: "https://player.vimeo.com/video/76979871",
                  externalWatchUrl: "https://vimeo.com/76979871",
                  language: SourceLanguage.SUB,
                  qualityLabel: "1080p",
                  isPrimary: true
                }
              ]
            }
          }
        ]
      }
    }
  });

  await prisma.homepageFeature.upsert({
    where: { section_showId: { section: "hero", showId: show.id } },
    update: {},
    create: { section: "hero", showId: show.id, sortOrder: 1 }
  });

  await prisma.show.upsert({
    where: { slug: "garden-of-light" },
    update: {},
    create: {
      slug: "garden-of-light",
      title: "Garden of Light",
      altTitles: ["Hikari no Niwa"],
      synopsis: "A restorative anthology following botanists documenting rare bioluminescent plants.",
      releaseYear: 2024,
      status: ShowStatus.COMPLETED,
      type: ShowType.DOCUMENTARY,
      totalEpisodes: 8,
      language: "English",
      posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
      bannerUrl: "https://images.unsplash.com/photo-1460881680858-30d872d5b530",
      isTrending: false,
      isLatestRelease: false,
      isRecentlyAdded: true,
      genres: { create: [{ genreId: drama.id }, { genreId: fantasy.id }] }
    }
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
