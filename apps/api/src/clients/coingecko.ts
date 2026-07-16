const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

interface CoinGeckoMarketItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export class CoinGeckoClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor(apiKey?: string) {
    this.baseUrl = COINGECKO_BASE_URL;
    this.apiKey = apiKey;
  }

  async getSpot(limit = 10): Promise<CoinGeckoMarketItem[]> {
    const params = new URLSearchParams({
      vs_currency: "usd",
      order: "price_change_percentage_24h_desc",
      per_page: String(limit),
      page: "1",
      sparkline: "false",
    });

    const headers: Record<string, string> = {};
    if (this.apiKey) {
      headers["x-cg-demo-api-key"] = this.apiKey;
    }

    const response = await fetch(`${this.baseUrl}/coins/markets?${params}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<CoinGeckoMarketItem[]>;
  }
}