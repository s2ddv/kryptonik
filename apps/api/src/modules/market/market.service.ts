import type { FastifyInstance } from "fastify";
import { CoinGeckoClient } from "../../clients/coingecko.js";

export interface SpotCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
}

const CACHE_TTL_SECONDS = 60; 

export class MarketService {
  private readonly coingecko: CoinGeckoClient;

  constructor(private readonly fastify: FastifyInstance) {
    this.coingecko = new CoinGeckoClient(process.env.COINGECKO_API_KEY);
  }

  async getSpot(limit = 10): Promise<SpotCoin[]> {
    const cacheKey = `market:spot:${limit}`;
    const cached = await this.fastify.redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as SpotCoin[];
    }

    const raw = await this.coingecko.getMarkets(limit);

    const data: SpotCoin[] = raw.map((c) => ({
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      image: c.image,
      currentPrice: c.current_price,
      priceChangePercentage24h: c.price_change_percentage_24h,
      marketCap: c.market_cap,
    }));

    await this.fastify.redis.set(cacheKey, JSON.stringify(data), "EX", CACHE_TTL_SECONDS);

    return data;
  }
}