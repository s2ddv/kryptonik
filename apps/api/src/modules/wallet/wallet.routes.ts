import type { FastifyInstance } from "fastify";
import { WalletService } from "./wallet.service.js";

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export default async function walletRoutes(fastify: FastifyInstance) {
  const walletService = new WalletService(fastify);

  fastify.get<{ Params: { address: string } }>(
    "/v1/wallet/:address",
    async (request, reply) => {
      const { address } = request.params;

      if (!ADDRESS_REGEX.test(address)) {
        return reply.status(400).send({ error: "Invalid Ethereum address" });
      }

      try {
        const summary = await walletService.getSummary(address);
        return reply.send(summary);
      } catch (err) {
        fastify.log.error({ err }, "Failed to fetch wallet summary");
        return reply.status(502).send({ error: "Failed to fetch wallet data" });
      }
    }
  );
}