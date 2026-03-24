import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const [bookmarks, history] = await Promise.all([
    prisma.bookmark.findMany({ where: { userId: session.user.id }, include: { show: true }, orderBy: { createdAt: "desc" } }),
    prisma.watchHistory.findMany({ where: { userId: session.user.id }, include: { show: true, episode: true }, orderBy: { lastWatchedAt: "desc" } })
  ]);

  return (
    <div className="container-page py-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <section>
        <h2 className="mb-2 text-xl">Bookmarks</h2>
        <ul className="space-y-2">{bookmarks.map((b) => <li key={b.id} className="rounded bg-card p-2">{b.show.title}</li>)}</ul>
      </section>
      <section>
        <h2 className="mb-2 text-xl">Continue Watching</h2>
        <ul className="space-y-2">{history.map((h) => <li key={h.id} className="rounded bg-card p-2">{h.show.title} - Ep {h.episode.episodeNumber}</li>)}</ul>
      </section>
    </div>
  );
}
