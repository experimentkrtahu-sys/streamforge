import Link from "next/link";
import Image from "next/image";

type Props = {
  show: { slug: string; title: string; posterUrl: string; releaseYear: number };
};

export function ShowCard({ show }: Props) {
  return (
    <Link href={`/shows/${show.slug}`} className="group min-w-40 space-y-2">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-card">
        <Image src={show.posterUrl} alt={show.title} fill className="object-cover transition group-hover:scale-105" />
      </div>
      <h3 className="line-clamp-1 text-sm font-semibold">{show.title}</h3>
      <p className="text-xs text-white/60">{show.releaseYear}</p>
    </Link>
  );
}
