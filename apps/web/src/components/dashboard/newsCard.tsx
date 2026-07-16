"use client";
 
import { useNews } from "../../hooks/useNews";
 
function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}
 
function SentimentDot({ sentiment = "neutral" as const }: { sentiment?: "up" | "down" | "neutral" | undefined }) {
  const color =
    sentiment === "up" ? "bg-green-400" : sentiment === "down" ? "bg-red-400" : "bg-brand-400";
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${color}`} />;
}
 
export function NewsCard() {
  const { data, isLoading, isError } = useNews();
 
  return (
    <div className="bg-neutral-900 rounded-xl p-6 h-full overflow-y-auto flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-100">News</h2>
 
      {isLoading && <p className="text-neutral-400 text-sm">Loading...</p>}
 
      {isError && (
        <p className="text-red-400 text-sm">Failed to load news.</p>
      )}
 
      {data && (
        <ul className="divide-y divide-neutral-800">
          {data.map((item) => (
            <li key={item.id} className="py-3 first:pt-0 last:pb-0">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 group"
              >
                <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                  <SentimentDot sentiment={item.sentiment} />
                  <span className="uppercase tracking-wide">{item.source}</span>
                  <span>· {timeAgo(item.publishedAt)}</span>
                </div>
                <p className="text-sm text-neutral-300 group-hover:text-brand-300 transition-colors leading-snug">
                  {item.title}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}