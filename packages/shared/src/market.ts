export interface Spot {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
}

export interface SpotResponse {
  data: Spot[];
  cachedAt: string;
}