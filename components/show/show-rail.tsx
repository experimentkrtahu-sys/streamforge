import { ShowCard } from "@/components/show/show-card";

export function ShowRail({ title, shows }: { title: string; shows: { slug: string; title: string; posterUrl: string; releaseYear: number }[] }) {
  if (!shows.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {shows.map((show) => (
          <ShowCard key={show.slug} show={show} />
        ))}
      </div>
    </section>
  );
}
