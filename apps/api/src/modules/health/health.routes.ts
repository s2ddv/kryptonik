import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/", {
    schema: {
      response: {
        200: {
          type: "object",
          required: ["status", "service", "timestamp"],
          properties: {
            status: { type: "string" },
            service: { type: "string" },
            timestamp: { type: "string" },
          },
        },
      },
    },
  }, async () => ({
    status: "ok",
    service: "kryptonik-api",
    timestamp: new Date().toISOString(),
  }));
};
