import Link from "next/link";
import { notFound } from "next/navigation";
import { WatchPlayer } from "@/components/watch/watch-player";
import { getWatchEpisode } from "@/modules/shows/queries";

export default async function WatchPage({ params }: { params: Promise<{ showSlug: string; episodeNumber: string }> }) {
  const { showSlug, episodeNumber } = await params;
  const episode = await getWatchEpisode(showSlug, Number(episodeNumber));
  if (!episode) notFound();

  const prev = episode.episodeNumber > 1 ? episode.episodeNumber - 1 : null;
  const next = episode.episodeNumber < episode.show.totalEpisodes ? episode.episodeNumber + 1 : null;

  return (
    <div className="container-page py-6 space-y-5">
      <h1 className="text-2xl font-bold">{episode.show.title} — Episode {episode.episodeNumber}</h1>
      <WatchPlayer sources={episode.sources.map((s) => ({ ...s, language: s.language }))} />
      <div className="flex items-center gap-2">
        {prev ? <Link className="rounded border border-white/20 px-3 py-1" href={`/watch/${showSlug}/${prev}`}>Prev</Link> : null}
        {next ? <Link className="rounded border border-white/20 px-3 py-1" href={`/watch/${showSlug}/${next}`}>Next</Link> : null}
        <label className="ml-4 text-sm"><input type="checkbox" className="mr-2" />Autoplay next</label>
      </div>
      <section className="rounded-xl border border-white/10 p-4 text-sm text-white/70">Comments module placeholder architecture (future extension).</section>
    </div>
  );
}
