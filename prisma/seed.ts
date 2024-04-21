import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function truncateTables() {
  const tables = [
    'User',
    'CoinState',
    'InvestmentCurrentState',
    'InvestmentState',
    'InvestmentType',
    'FeeType',
    'Fees',
    'PlatformType',
    'Coin',
    'PlatformLink',
    'CoinCurrentState',
    'Investment',
    'TokenomicsType',
    'Tokenomics',
    'BalanceTransaction',
    'BalanceTransactionType',
    'FeaturedCoin',
  ];
  for (const table of tables) {
    const query = `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRawUnsafe(query);
  }
}

export async function seedData() {
  // Users
  await prisma.user.createMany({
    data: [
      {
        walletAddress: 'A713ApR6DiuiKaZXhX4jR6R2i55UVBZiCf32RdnzPUAk',
        isPrivileged: true,
      },
    ],
  });

  // FeeType
  await prisma.feeType.createMany({
    data: [{ name: 'Coin Creation' }, { name: 'Coin Investment' }],
  });

  // Assumes FeeType IDs start at 1
  // Fees
  await prisma.fees.createMany({
    data: [
      { amount: 1000000000, feeTypeId: 1 },
      { amount: 100000, feeTypeId: 2 },
    ],
  });

  // CoinState
  await prisma.coinState.createMany({
    data: [
      { name: 'Edit' },
      { name: 'Upcoming' },
      { name: 'Active' },
      { name: 'Pending' },
      { name: 'Hold' },
      { name: 'Eneded' },
    ],
  });

  // Coin
  await prisma.coin.createMany({
    data: [
      {
        name: 'Bitcoin',
        symbolName: 'BTC',
        symbolImage: 'https://www.bitcoin.com',
        bannerImage: 'https://www.bitcoin.com',
        description: 'The first cryptocurrency',
        userId: 1,
      },
    ],
  });

  // TokenomicsType
  await prisma.tokenomicsType.createMany({
    data: [{ name: 'Liquidity' }, { name: 'Presale' }, { name: 'Platform' }, { name: 'Dev' }],
  });

  // Tokenomics
  await prisma.tokenomics.createMany({
    data: [
      { coinId: 1, tokenomicsTypeId: 1, value: 0.2 },
      { coinId: 1, tokenomicsTypeId: 2, value: 0.3 },
      { coinId: 1, tokenomicsTypeId: 3, value: 0.02 },
      { coinId: 1, tokenomicsTypeId: 4, value: 0.03 },
    ],
  });

  // PlatformType
  await prisma.platformType.createMany({
    data: [
      { name: 'Twitter' },
      { name: 'Reddit' },
      { name: 'Discord' },
      { name: 'Telegram' },
      { name: 'Website' },
      { name: 'Docs' },
    ],
  });

  // PlatformLink
  await prisma.platformLink.createMany({
    data: [{ coinId: 1, platformTypeId: 1, link: 'https://www.facebook.com' }],
  });

  // InvestmentState
  await prisma.investmentState.createMany({
    data: [{ name: 'Pending' }, { name: 'Payout' }, { name: 'Balance' }, { name: 'Failed' }],
  });

  // CoinCurrentState - Assuming Coin and CoinState IDs start at 1
  await prisma.coinCurrentState.createMany({
    data: [{ coinId: 1, stateId: 1, validFrom: new Date('2023-01-01') }],
  });

  await prisma.balanceTransactionType.createMany({
    data: [{ name: 'Refund' }, { name: 'Investment' }, { name: 'Credit' }],
  });

  await prisma.investmentType.createMany({
    data: [
      { name: 'Activation', feeId: 1 },
      { name: 'Investment', feeId: 2 },
    ],
  });

  // Investment and InvestmentCurrentState
  // Assuming IDs for user, coin, and investment state are known
  await prisma.investment.createMany({
    data: [
      {
        coinId: 1,
        userId: 1,
        investmentTypeId: 1,
        amount: 100000000,
        placedAt: new Date('2023-01-01'),
        isApproved: false,
        signature: '0x1234567890',
      },
      {
        coinId: 1,
        userId: 1,
        investmentTypeId: 1,
        amount: 1000000000000,
        placedAt: new Date('2023-02-01'),
        isApproved: false,
        signature: '0x12345678910',
      },
    ],
  });

  await prisma.featuredCoin.createMany({
    data: [
      {
        coinId: 1,
      },
    ],
  });
}

async function main() {
  console.log(`Start seeding ...`);

  await truncateTables();
  await seedData();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
