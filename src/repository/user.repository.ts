import { IUserRepo } from '@/interfaces/user.interface';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class UserRepo implements IUserRepo {
  async getUserByWalletAddress(walletAddress: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: walletAddress,
      },
    });
    return user;
  }

  async registerUser(walletAddress: string): Promise<any> {
    const userExists = await this.getUserByWalletAddress(walletAddress);
    if (!userExists) {
      await prisma.user.create({
        data: {
          walletAddress: walletAddress,
        },
      });
    }

    return { walletAddress };
  }

  async getBalanceFromUser(walletAddress: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: walletAddress,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const investments = await prisma.investment.findMany({
      where: {
        userId: user.id,
        currentState: {
          some: {
            state: {
              name: 'Balance',
            },
          },
        },
      },
      select: {
        amount: true,
      },
    });

    const totalBalance = investments.reduce((acc, investment) => acc + investment.amount, 0);

    return totalBalance;
  }
}
