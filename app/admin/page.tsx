import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";

export default async function AdminDashboard() {
  await requireAdmin();
  const [shows, episodes, users, mostViewed] = await Promise.all([
    prisma.show.count(),
    prisma.episode.count(),
    prisma.user.count(),
    prisma.show.findMany({ orderBy: { viewCount: "desc" }, take: 5 })
  ]);

  return (
    <div className="container-page py-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded bg-card p-4">Total Shows: {shows}</div>
        <div className="rounded bg-card p-4">Total Episodes: {episodes}</div>
        <div className="rounded bg-card p-4">Users: {users}</div>
      </div>
      <div className="flex gap-3 text-sm">
        <Link href="/admin/shows/new" className="rounded bg-accent px-3 py-2">Add Show</Link>
        <Link href="/admin/episodes/new" className="rounded border border-white/20 px-3 py-2">Add Episode</Link>
        <Link href="/admin/users" className="rounded border border-white/20 px-3 py-2">Manage Users</Link>
      </div>
      <section className="space-y-2">
        <h2 className="text-xl">Most viewed titles</h2>
        {mostViewed.map((show) => <div key={show.id} className="rounded bg-card p-2">{show.title} ({show.viewCount} views)</div>)}
      </section>
    </div>
  );
}
