import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getShowBySlug } from "@/modules/shows/queries";

export default async function ShowDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const show = await getShowBySlug(slug);
  if (!show) notFound();

  return (
    <div className="container-page py-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <Image src={show.posterUrl} alt={show.title} width={280} height={420} className="rounded-xl" />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{show.title}</h1>
          <p className="text-sm text-white/70">{show.altTitles.join(" • ")}</p>
          <p className="text-white/80">{show.synopsis}</p>
          <p className="text-sm text-white/60">{show.type} • {show.status} • {show.releaseYear} • {show.language}</p>
          <p className="text-sm">Genres: {show.genres.map((g) => g.genre.name).join(", ")}</p>
          <p className="text-sm">Studios: {show.studios.map((g) => g.studio.name).join(", ") || "N/A"}</p>
          <p className="text-sm">Producers: {show.producers.map((g) => g.producer.name).join(", ") || "N/A"}</p>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Episodes</h2>
        <div className="space-y-2">
          {show.episodes.map((episode) => (
            <div key={episode.id} className="flex items-center justify-between rounded bg-card p-3">
              <p>Ep {episode.episodeNumber}: {episode.title}</p>
              <Link href={`/watch/${show.slug}/${episode.episodeNumber}`} className="rounded bg-accent px-3 py-1 text-sm">Watch</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
