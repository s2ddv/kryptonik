import { prisma } from "../lib/prisma.js";

export const userRepository = {
  create(email: string, name?: string) {
    return prisma.user.create({
      data: { email, name },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  findByIdWithRelations(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        wallets: true,
        watchlists: true,
        exchangeConnections: true,
      },
    });
  },
};