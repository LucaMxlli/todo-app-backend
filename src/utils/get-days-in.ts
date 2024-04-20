import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDaysIn = async (coinId: number): Promise<number> => {
  const fundingState = await prisma.coinCurrentState.findFirst({
    where: {
      coinId: coinId,
      state: {
        name: "funding",
      },
    },
    include: {
      state: true,
    },
    orderBy: {
      validFrom: "asc",
    },
  });

  if (fundingState) {
    const now = new Date();
    const validFrom = new Date(fundingState.validFrom);
    const difference = now.getTime() - validFrom.getTime();
    const days = difference / (1000 * 3600 * 24);
    return Math.floor(days);
  } else {
    return -1;
  }
};
