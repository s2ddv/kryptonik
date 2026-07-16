import { useEffect, useState } from "react";

export type NewsItem = {
  id: string;
  source: string;
  title: string;
  url: string;
  publishedAt: string; 
  sentiment?: "up" | "down" | "neutral";
};

type UseNewsResult = {
  data: NewsItem[] | null;
  isLoading: boolean;
  isError: boolean;
};

export function useNews(query = "bitcoin OR crypto"): UseNewsResult {
  const [data, setData] = useState<NewsItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchNews() {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const json = await res.json();
        if (!cancelled) setData(json.data);
      } catch {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchNews();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { data, isLoading, isError };
}