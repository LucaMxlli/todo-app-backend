import { ICoinRepo } from '@/interfaces/coin.interface';
import { PrismaClient } from '@prisma/client';

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

    return state[0];
  }

  async checkCoinExists(coinId: number) {
    const coin = await prisma.coin.findUnique({
      where: {
        id: coinId,
      },
    });

    return coin !== null;
  }

  async getInvolvedCoins(walletAddress: string) {
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: walletAddress,
      },
    });

    if (user === null) {
      throw new Error('User does not exist');
    }

    const investmentCoins = await prisma.investment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        coin: {
          include: {
            Tokenomics: {
              include: {
                tokenomicsType: true,
              },
            },
            platformLinks: {
              include: {
                platformType: true,
              },
            },
            currentState: {
              where: {
                validFrom: {
                  lte: new Date(),
                },
              },
              orderBy: {
                validFrom: 'desc',
              },
              take: 1,
              include: {
                state: true,
              },
            },
          },
        },
      },
    });

    const coins = investmentCoins.map(async (i) => {
      const coin = await this.getCoinById(i.coinId);
      return {
        ...coin,
        tokenomics: await this.getTokenomics(i.coinId),
      };
    });

    const results = await Promise.all(coins);
    const unique = results.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

    return unique;
  }

  async getCoins(state?: string) {
    const coins = await prisma.coin.findMany({
      include: {
        Tokenomics: {
          include: {
            tokenomicsType: true,
          },
        },
        platformLinks: {
          include: {
            platformType: true,
          },
        },
        currentState: {
          where: {
            validFrom: {
              lte: new Date(),
            },
          },
          orderBy: {
            validFrom: 'desc',
          },
          take: 1,
          include: {
            state: true,
          },
        },
      },
    });

    let filteredCoins = coins;
    if (state) {
      filteredCoins = coins.filter((c) => {
        if (c.currentState.length >= 0 && c.currentState[0]?.state.name === state) {
          return c.currentState[0].state.name === state;
        }
      });
    }

    const mapped = filteredCoins.map(async (c) => {
      const current = await this.getCoinCurrent(c.id);
      const supporters = await this.getCoinSupporters(c.id);
      return {
        ...c,
        current,
        supporters,
      };
    });

    const results = await Promise.all(mapped);

    return results;
  }

  async getCoinById(coinId: number) {
    const coin = await prisma.coin.findUnique({
      where: {
        id: coinId,
      },
      include: {
        Tokenomics: {
          include: {
            tokenomicsType: true,
          },
        },
        platformLinks: {
          include: {
            platformType: true,
          },
        },
        currentState: {
          where: {
            validFrom: {
              lte: new Date(),
            },
          },
          orderBy: {
            validFrom: 'desc',
          },
          take: 1,
          include: {
            state: true,
          },
        },
      },
    });

    if (coin === null) {
      throw new Error('Coin does not exist');
    }

    const current = await this.getCoinCurrent(coinId);
    const supporters = await this.getCoinSupporters(coinId);

    (coin as any).current = current;
    (coin as any).supporters = supporters;

    return coin;
  }

  async getFeaturedCoins() {
    const coins = await prisma.featuredCoin.findMany({
      include: {
        coin: {
          include: {
            Tokenomics: {
              include: {
                tokenomicsType: true,
              },
            },
            platformLinks: {
              include: {
                platformType: true,
              },
            },
            currentState: {
              where: {
                validFrom: {
                  lte: new Date(),
                },
              },
              orderBy: {
                validFrom: 'desc',
              },
              take: 1,
              include: {
                state: true,
              },
            },
          },
        },
      },
      take: 6,
      orderBy: {
        validFrom: 'desc',
      },
    });

    const mapped = coins.map(async (c) => {
      const current = await this.getCoinCurrent(c.coin.id);
      const supporters = await this.getCoinSupporters(c.coin.id);
      return {
        ...c.coin,
        current,
        supporters,
      };
    });

    const results = await Promise.all(mapped);

    return results;
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

  async getTokenomics(coinId: number) {
    const tokenomics = await prisma.tokenomics.findMany({
      where: {
        coinId: coinId,
      },
      include: {
        tokenomicsType: true,
      },
    });

    return tokenomics;
  }

  async getSocials(coinId: number) {
    const socials = await prisma.platformLink.findMany({
      where: {
        coinId: coinId,
      },
      include: {
        platformType: true,
      },
    });

    return socials;
  }

  async getOwnCoins(walletAddress: string) {
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: walletAddress,
      },
      include: {
        coin: {
          include: {
            Tokenomics: {
              include: {
                tokenomicsType: true,
              },
            },
            platformLinks: {
              include: {
                platformType: true,
              },
            },
            currentState: {
              where: {
                validFrom: {
                  lte: new Date(),
                },
              },
              orderBy: {
                validFrom: 'desc',
              },
              take: 1,
              include: {
                state: true,
              },
            },
          },
        },
      },
    });

    if (user === null) {
      throw new Error('User does not exist');
    }

    const coins = await prisma.coin.findMany({
      where: {
        userId: user.id,
      },
      include: {
        currentState: {
          where: {
            validFrom: {
              lte: new Date(),
            },
          },
          orderBy: {
            validFrom: 'desc',
          },
          take: 1,
          include: {
            state: true,
          },
        },
      },
    });

    const mapped = coins.map(async (c) => {
      const current = await this.getCoinCurrent(c.id);
      const supporters = await this.getCoinSupporters(c.id);
      const tokenomics = await this.getTokenomics(c.id);
      return {
        ...c,
        current,
        supporters,
        tokenomics: tokenomics,
      };
    });

    const results = await Promise.all(mapped);

    return results;
  }

  async getCoinInvestments(coinId: number, target?: boolean) {
    const investments = await prisma.investment.findMany({
      where: {
        coinId: coinId,
      },
      include: {
        currentState: {
          where: {
            validFrom: {
              lte: new Date(),
            },
          },
          orderBy: {
            validFrom: 'desc',
          },
          take: 1,
          include: {
            state: true,
          },
        },
        investmentType: {
          include: {
            fee: true,
          },
        },
      },
    });

    if (target) {
      const targetInvestments = investments.filter((i) => {
        return i.investmentType.name === 'Investment' && i.isApproved && i.currentState[0].state.name === 'Pending';
      });
      return targetInvestments;
    }

    return investments;
  }

  async getCoinSupporters(coinId: number) {
    return (await this.getCoinInvestments(coinId, true)).length;
  }

  async getCoinCurrent(coinId: number) {
    const investments = await this.getCoinInvestments(coinId, true);
    const current = investments.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    return current;
  }
}
