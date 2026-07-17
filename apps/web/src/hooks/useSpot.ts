"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

interface SpotCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
}

export function useSpot(limit = 10) {
  const [data, setData] = useState<{ data: SpotCoin[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiFetch<SpotCoin[]>(`/v1/market/spot?limit=${limit}`)
      .then((coins) => setData({ data: coins }))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [limit]);

  return { data, isLoading, isError };
}