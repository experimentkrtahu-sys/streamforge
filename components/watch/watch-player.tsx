"use client";

import { useState } from "react";

type Source = { id: string; label: string; embedUrl: string; language: string; qualityLabel: string | null };

export function WatchPlayer({ sources }: { sources: Source[] }) {
  const [active, setActive] = useState(sources[0]);
  return (
    <div className="space-y-4">
      <div className="aspect-video overflow-hidden rounded-xl border border-white/10">
        <iframe src={active.embedUrl} allowFullScreen className="h-full w-full" referrerPolicy="no-referrer" />
      </div>
      <div className="flex gap-2">
        {sources.map((source) => (
          <button key={source.id} onClick={() => setActive(source)} className="rounded border border-white/20 px-3 py-1 text-xs hover:bg-white/10">
            {source.label} • {source.language} {source.qualityLabel ? `• ${source.qualityLabel}` : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
