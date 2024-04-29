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

  async requestRefund(userId: number) {
    const refund = await prisma.balanceTransaction.create({
      data: {
        userId: userId,
        value: 0,
        typeId: 2,
        approved: false,
      },
    });

    return Number(refund.value);
  }
}
