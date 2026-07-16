import type { FastifyInstance } from "fastify";
import type { Spot, SpotResponse } from "@kryptonik/shared";
import { CoinGeckoClient } from "../../clients/coingecko.js";

const CACHE_KEY = "market:spot";
const CACHE_TTL_SECONDS = 60; // ajusta conforme necessidade (60s-300s é razoável pra dados de mercado)

export class MarketService {
  private readonly coingecko: CoinGeckoClient;

  constructor(private readonly fastify: FastifyInstance) {
    this.coingecko = new CoinGeckoClient(process.env.COINGECKO_API_KEY);
  }

  async getSpot(): Promise<SpotResponse> {
    const cached = await this.fastify.redis.get(CACHE_KEY);

    if (cached) {
      return JSON.parse(cached) as SpotResponse;
    }

    const raw = await this.coingecko.getSpot(10);

    const data: Spot[] = raw.map((item) => ({
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      image: item.image,
      currentPrice: item.current_price,
      priceChangePercentage24h: item.price_change_percentage_24h,
      marketCap: item.market_cap,
    }));

    const response: SpotResponse = {
      data,
      cachedAt: new Date().toISOString(),
    };

    await this.fastify.redis.set(
      CACHE_KEY,
      JSON.stringify(response),
      "EX",
      CACHE_TTL_SECONDS
    );

    return response;
  }
}