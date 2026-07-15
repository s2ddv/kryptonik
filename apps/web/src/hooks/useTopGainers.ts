import { useQuery } from "@tanstack/react-query";
import type { TopGainersResponse } from "@kryptonik/shared";
import { apiFetch } from "@/lib/api";

export function useTopGainers() {
  return useQuery({
    queryKey: ["market", "top-gainers"],
    queryFn: () => apiFetch<TopGainersResponse>("/v1/market/top-gainers"),
    refetchInterval: 60_000, 
  });
}