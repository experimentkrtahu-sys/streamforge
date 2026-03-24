import Link from "next/link";
import Image from "next/image";

export function HeroCarousel({ shows }: { shows: { slug: string; title: string; synopsis: string; bannerUrl: string | null; posterUrl: string }[] }) {
  const top = shows[0];
  if (!top) return null;
  return (
    <section className="relative mb-8 overflow-hidden rounded-2xl border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent" />
      <Image src={top.bannerUrl || top.posterUrl} alt={top.title} width={1400} height={500} className="h-[340px] w-full object-cover" />
      <div className="absolute inset-0 p-8">
        <h1 className="max-w-xl text-3xl font-bold">{top.title}</h1>
        <p className="mt-3 max-w-xl text-sm text-white/80">{top.synopsis}</p>
        <Link href={`/shows/${top.slug}`} className="mt-4 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium">Watch now</Link>
      </div>
    </section>
  );
}
