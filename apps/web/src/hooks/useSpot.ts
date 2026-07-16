import { useQuery } from "@tanstack/react-query";
import type { SpotResponse } from "@kryptonik/shared";
import { apiFetch } from "../lib/api";

export function useSpot() {
  return useQuery<SpotResponse>({
    queryKey: ["market", "spot"],
    queryFn: () => apiFetch<SpotResponse>("/v1/market/spot"),
    refetchInterval: 60_000,
  });
}