import type { FastifyInstance } from "fastify";
import { MarketService } from "./market.service.js";

export default async function marketRoutes(fastify: FastifyInstance) {
  const marketService = new MarketService(fastify);

  fastify.get<{ Querystring: { limit?: string } }>(
    "/v1/market/spot",
    async (request, reply) => {
      const limit = request.query.limit ? Number(request.query.limit) : 10;

      try {
        const data = await marketService.getSpot(limit);
        return reply.send(data);
      } catch (err) {
        fastify.log.error({ err }, "Failed to fetch market data");
        return reply.status(502).send({ error: "Failed to fetch market data" });
      }
    }
  );
}