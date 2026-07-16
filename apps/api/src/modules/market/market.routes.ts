import type { FastifyInstance } from "fastify";
import { MarketService } from "./market.service.js";

export default async function marketRoutes(fastify: FastifyInstance) {
  const marketService = new MarketService(fastify);

  fastify.get("/v1/market/spot", async (_request, reply) => {
    try {
      const result = await marketService.getSpot();
      return reply.send(result);
    } catch (err) {
      fastify.log.error({ err }, "Failed to fetch spot");
      return reply.status(502).send({ error: "Failed to fetch market data" });
    }
  });
}