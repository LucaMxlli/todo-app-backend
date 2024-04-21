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
      {
        walletAddress: 'A5813ApR6DiuiKaZXhX4jR6R2i55UVBZiCf32RdnzPUAk',
        isPrivileged: false,
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
      { amount: 10000000, feeTypeId: 1 },
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
      { name: 'Ended' },
      { name: 'Failed' },
    ],
  });

  // Coin
  await prisma.coin.createMany({
    data: [
      {
        name: 'Bitcoin',
        symbolName: 'BTC',
        symbolImage:
          'https://images.pexels.com/photos/15045040/pexels-photo-15045040/free-photo-of-meer-fashion-mode-mann.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        bannerImage:
          'https://images.pexels.com/photos/15045040/pexels-photo-15045040/free-photo-of-meer-fashion-mode-mann.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: 'The first cryptocurrency',
        userId: 1,
        closesAt: new Date('2024-12-12'),
      },
      {
        name: 'Shitcoin',
        symbolName: 'BTC',
        symbolImage:
          'https://images.pexels.com/photos/15045040/pexels-photo-15045040/free-photo-of-meer-fashion-mode-mann.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        bannerImage:
          'https://images.pexels.com/photos/15045040/pexels-photo-15045040/free-photo-of-meer-fashion-mode-mann.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: 'The first cryptocurrency',
        userId: 2,
        closesAt: new Date('2024-05-12'),
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
      { coinId: 2, tokenomicsTypeId: 1, value: 0.2 },
      { coinId: 2, tokenomicsTypeId: 2, value: 0.3 },
      { coinId: 2, tokenomicsTypeId: 3, value: 0.02 },
      { coinId: 2, tokenomicsTypeId: 4, value: 0.03 },
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
    data: [
      { coinId: 1, platformTypeId: 1, link: 'https://www.facebook.com' },
      { coinId: 2, platformTypeId: 2, link: 'https://www.reddit.com' },
    ],
  });

  // InvestmentState
  await prisma.investmentState.createMany({
    data: [{ name: 'Pending' }, { name: 'Payout' }, { name: 'Balance' }, { name: 'Failed' }],
  });

  // CoinCurrentState - Assuming Coin and CoinState IDs start at 1
  await prisma.coinCurrentState.createMany({
    data: [
      { coinId: 1, stateId: 1, validFrom: new Date('2024-01-02') },
      { coinId: 1, stateId: 2, validFrom: new Date('2024-04-21') },
      { coinId: 2, stateId: 1, validFrom: new Date('2024-08-08') },
      { coinId: 2, stateId: 2, validFrom: new Date('2024-08-09') },
    ],
  });

  await prisma.balanceTransactionType.createMany({
    data: [{ name: 'Refund' }, { name: 'Investment' }, { name: 'Credit' }],
  });

  await prisma.balanceTransaction.createMany({
    data: [
      {
        userId: 1,
        value: 100000000,
        typeId: 2,
        approved: true,
        transacted_at: new Date('2023-01-01'),
      },
    ],
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
        isApproved: true,
        signature: '0x1234567890',
      },
      {
        coinId: 2,
        userId: 1,
        investmentTypeId: 1,
        amount: 100000000,
        placedAt: new Date('2023-01-05'),
        isApproved: true,
        signature: '0x1234567823490',
      },
      {
        coinId: 1,
        userId: 1,
        investmentTypeId: 1,
        amount: 1000000000,
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
