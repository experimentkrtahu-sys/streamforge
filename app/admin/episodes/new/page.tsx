import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";

export default async function NewEpisodePage() {
  await requireAdmin();
  const shows = await prisma.show.findMany({ select: { id: true, title: true }, orderBy: { title: "asc" } });

  return (
    <div className="container-page py-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Episode</h1>
      <form action="/api/episodes" method="post" className="grid gap-3 rounded-xl bg-card p-4 md:grid-cols-2">
        <select name="showId" className="rounded bg-bg p-2">{shows.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}</select>
        <input name="episodeNumber" type="number" placeholder="Episode number" className="rounded bg-bg p-2" required />
        <input name="title" placeholder="Title" className="rounded bg-bg p-2 md:col-span-2" required />
        <input name="slug" placeholder="Slug" className="rounded bg-bg p-2" required />
        <input name="thumbnailUrl" placeholder="Thumbnail URL" className="rounded bg-bg p-2" />
        <input name="embedUrl" placeholder="Primary embed URL" className="rounded bg-bg p-2 md:col-span-2" required />
        <button className="rounded bg-accent px-3 py-2 md:col-span-2">Create</button>
      </form>
    </div>
  );
}
