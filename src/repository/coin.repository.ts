import { ICoinRepo } from '@/interfaces/coin.interface';
import { PrismaClient } from '@prisma/client';
import { some } from 'cypress/types/bluebird';

const prisma = new PrismaClient();

export class CoinRepo implements ICoinRepo {
  async getCurrentState(coinId: number) {
    const state = await prisma.coinCurrentState.findMany({
      where: {
        coinId: coinId,
        validFrom: {
          lte: new Date(),
        },
      },
      include: {
        state: true,
      },
      orderBy: {
        validFrom: 'desc',
      },
    });

    if (state.length === 0) {
      throw new Error('Coin does not exist');
    }

    return state[0].state;
  }

  async checkCoinExists(coinId: number) {
    const coin = await prisma.coin.findUnique({
      where: {
        id: coinId,
      },
    });

    return coin !== null;
  }

  async getCoins(state: string) {
    const coins = await prisma.coin.findMany();

    return coins;
  }

  async getCoinById(coinId: number) {
    const coin = await prisma.coin.findUnique({
      where: {
        id: coinId,
      },
    });

    if (coin === null) {
      throw new Error('Coin does not exist');
    }

    return coin;
  }

  async getFeaturedCoins() {
    const coins = await prisma.featuredCoin.findMany({
      include: {
        coin: true,
      },
      take: 6,
      orderBy: {
        validFrom: 'desc',
      },
    });

    return coins.map((c) => c.coin);
  }

  async getCoinStateByName(state: string) {
    const coinState = await prisma.coinState.findUnique({
      where: {
        name: state,
      },
    });

    if (coinState === null) {
      throw new Error('Coin state does not exist');
    }

    return coinState;
  }

  async setCurrentState(coinId: number, state: string, date?: Date) {
    if (!(await this.checkCoinExists(coinId))) {
      throw new Error('Coin does not exist');
    }

    const coinState = await this.getCoinStateByName(state);

    await prisma.coinCurrentState.create({
      data: {
        coinId: coinId,
        stateId: coinState.id,
        validFrom: date || new Date(),
      },
    });

    const coin = await this.getCoinById(coinId);

    return coin;
  }
}
