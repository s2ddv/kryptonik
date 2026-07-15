import Fastify from "fastify";
import cors from "@fastify/cors";
import redisPlugin from "./plugins/redis.js";
import marketRoutes from "./modules/market/market.routes.js";
import walletRoutes from "./modules/wallet/wallet.routes.js";

const fastify = Fastify({ logger: true });

await fastify.register(walletRoutes);
await fastify.register(cors);
await fastify.register(redisPlugin);
await fastify.register(marketRoutes);

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});