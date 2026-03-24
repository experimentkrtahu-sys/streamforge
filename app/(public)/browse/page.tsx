import { ShowCard } from "@/components/show/show-card";
import { browseShows, BrowseParams } from "@/modules/shows/queries";

export default async function BrowsePage({ searchParams }: { searchParams: Promise<BrowseParams> }) {
  const params = await searchParams;
  const results = await browseShows(params);

  return (
    <div className="container-page py-6 space-y-6">
      <h1 className="text-3xl font-bold">Browse</h1>
      <form className="grid gap-2 rounded-xl border border-white/10 bg-card p-4 md:grid-cols-6">
        <input name="q" placeholder="Search title" defaultValue={params.q} className="rounded bg-bg p-2 md:col-span-2" />
        <input name="genre" placeholder="Genre" defaultValue={params.genre} className="rounded bg-bg p-2" />
        <input name="year" placeholder="Year" defaultValue={params.year} className="rounded bg-bg p-2" />
        <select name="sort" defaultValue={params.sort ?? "latest"} className="rounded bg-bg p-2">
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
          <option value="rating">Rating</option>
          <option value="az">A-Z</option>
        </select>
        <button className="rounded bg-accent px-3">Apply</button>
      </form>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {results.items.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
      <p className="text-sm text-white/60">Page {results.page} / {results.totalPages || 1}</p>
    </div>
  );
}
