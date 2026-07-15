export interface TopGainer {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
}

export interface TopGainersResponse {
  data: TopGainer[];
  cachedAt: string;
}