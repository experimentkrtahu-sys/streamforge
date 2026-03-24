import { createShowAction } from "@/modules/admin/actions";

export function AdminShowForm() {
  return (
    <form action={createShowAction} className="grid gap-3 rounded-xl border border-white/10 bg-card p-4 md:grid-cols-2">
      <input name="title" placeholder="Title" className="rounded bg-bg p-2" required />
      <input name="slug" placeholder="Slug" className="rounded bg-bg p-2" required />
      <textarea name="synopsis" placeholder="Synopsis" className="rounded bg-bg p-2 md:col-span-2" required minLength={20} />
      <input name="releaseYear" type="number" placeholder="Year" className="rounded bg-bg p-2" required />
      <select name="status" className="rounded bg-bg p-2">
        <option value="ONGOING">Ongoing</option>
        <option value="COMPLETED">Completed</option>
        <option value="UPCOMING">Upcoming</option>
      </select>
      <select name="type" className="rounded bg-bg p-2">
        <option value="SERIES">Series</option>
        <option value="MOVIE">Movie</option>
        <option value="OVA">OVA</option>
        <option value="SPECIAL">Special</option>
        <option value="DOCUMENTARY">Documentary</option>
      </select>
      <input name="language" placeholder="Language" className="rounded bg-bg p-2" required />
      <input name="totalEpisodes" type="number" placeholder="Total episodes" className="rounded bg-bg p-2" required />
      <input name="posterUrl" placeholder="Poster URL" className="rounded bg-bg p-2 md:col-span-2" required />
      <input name="bannerUrl" placeholder="Banner URL" className="rounded bg-bg p-2 md:col-span-2" />
      <button className="rounded bg-accent px-4 py-2 font-medium md:col-span-2">Create show</button>
    </form>
  );
}
