import { IRefundRepo } from '@/interfaces/refund.interface';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class RefundRepo implements IRefundRepo {
  async getRefundHistory(userId: number) {
    const history = await prisma.balanceTransaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        type: {
          select: {
            name: true,
          },
        },
      },
    });

    return history;
  }
}
