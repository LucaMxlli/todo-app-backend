import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function truncateTables() {
  const tables = [
    'User',
    'CoinState',
    'UserTokenType',
    'InvestmentState',
    'FeeType',
    'Fees',
    'PlatformType',
    'FundingTarget',
    'Coin',
    'PlatformLink',
    'CoinCurrentState',
    'CoinCollectionItem',
    'Investment',
    'InvestmentCurrentState',
    'TokenomicsType',
    'Tokenomics',
    'BalanceTransactionType',
    'BalanceTransaction',
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
        email: 'jane.doe@example.com',
        isPrivileged: false,
        emailVerified: true,
        name: 'Jane Doe',
        profilePicture:
          'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710979200&semt=ais',
      },
      {
        email: 'alice.smith@example.com',
        isPrivileged: true,
        name: 'Alice Smith',
        profilePicture:
          'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710979200&semt=ais',
      },
      {
        email: 'bob.johnson@example.com',
        isPrivileged: false,
        name: 'Bob Johnson',
        profilePicture:
          'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710979200&semt=ais',
      },
      {
        email: 'carol.white@example.com',
        isPrivileged: true,
        name: 'Carol White',
        profilePicture:
          'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710979200&semt=ais',
      },
      {
        email: 'dave.brown@example.com',
        isPrivileged: false,
        name: 'Dave Brown',
        profilePicture:
          'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710979200&semt=ais',
      },
      {
        email: 'sasd.brown@example.com',
        isPrivileged: false,
        name: 'Marvin Brown',
        profilePicture:
          'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710979200&semt=ais',
      },
      {
        email: 'jonas.brown@example.com',
        isPrivileged: false,
        name: 'Jonas Brown',
        profilePicture:
          'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710979200&semt=ais',
      },
    ],
  });

  await prisma.wallet.createMany({
    data: [
      {
        userId: 1,
        address: '0x456...',
      },
      {
        userId: 2,
        address: '0x45626...',
      },
      {
        userId: 3,
        address: '0x423456...',
      },
      {
        userId: 4,
        address: '0x452346...',
      },
    ],
  });

  await prisma.userTokenType.createMany({
    data: [{ name: 'email' }],
  });

  // FeeType
  await prisma.feeType.createMany({
    data: [{ name: 'Coin Creation' }, { name: 'Coin Reactivation' }],
  });

  // Assumes FeeType IDs start at 1
  // Fees
  await prisma.fees.createMany({
    data: [
      { amount: 1.5, validFrom: new Date('2023-01-01'), feeTypeId: 1 },
      { amount: 2.0, validFrom: new Date('2023-02-01'), feeTypeId: 2 },
    ],
  });

  // FundingTarget
  await prisma.fundingTarget.createMany({
    data: [{ amount: 25000000000, validFrom: new Date('2023-01-01') }],
  });

  // CoinState
  await prisma.coinState.createMany({
    data: [{ name: 'edit' }, { name: 'funding' }, { name: 'pending' }, { name: 'live' }, { name: 'archived' }],
  });

  // Coin
  await prisma.coin.createMany({
    data: [
      {
        name: 'Bitcoin',
        symbolName: 'BTC',
        symbolImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
        bannerImage: 'https://t3.ftcdn.net/jpg/05/82/38/68/360_F_582386812_m5TuGsdtFMgQ7nJ8RNrVvXOuS8xu1dgj.jpg',
        description: 'Bitcoin is a cryptocurrency that is used to store and exchange digital currency.',
        userId: 1,
        buyLink: 'https://www.coinbase.com',
        watchLink: 'https://www.binance.com',
        createdAt: new Date('2020-01-01'),
        fundingEnd: new Date('2024-04-20'),
        targetAmount: 25000000000,
        targetValidFrom: new Date('2023-01-01'),
      },
      {
        name: 'HAMI',
        symbolName: 'HAMI',
        symbolImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
        bannerImage: 'https://t3.ftcdn.net/jpg/05/82/38/68/360_F_582386812_m5TuGsdtFMgQ7nJ8RNrVvXOuS8xu1dgj.jpg',
        description: 'Digital currency',
        userId: 2,
        targetAmount: 25000000000,
        targetValidFrom: new Date('2023-01-01'),

        createdAt: new Date(),
      },
      {
        name: 'SETH',
        symbolName: 'SETH',
        symbolImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
        bannerImage: 'https://t3.ftcdn.net/jpg/05/82/38/68/360_F_582386812_m5TuGsdtFMgQ7nJ8RNrVvXOuS8xu1dgj.jpg',
        description: 'Digital currency',
        userId: 2,
        createdAt: new Date(),
      },
      {
        name: 'MEME',
        symbolName: 'MEME',
        symbolImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
        bannerImage: 'https://t3.ftcdn.net/jpg/05/82/38/68/360_F_582386812_m5TuGsdtFMgQ7nJ8RNrVvXOuS8xu1dgj.jpg',
        description: 'Digital currency',
        userId: 3,
        createdAt: new Date(),
      },
      {
        name: 'WUHU',
        symbolName: 'WUHU',
        symbolImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
        bannerImage: 'https://t3.ftcdn.net/jpg/05/82/38/68/360_F_582386812_m5TuGsdtFMgQ7nJ8RNrVvXOuS8xu1dgj.jpg',
        description: 'Digital currency',
        userId: 4,
        createdAt: new Date(),
      },
    ],
  });

  // TokenomicsType
  await prisma.tokenomicsType.createMany({
    data: [
      { name: 'Liquidity' },
      { name: 'Presale' },
      { name: 'Burn' },
      { name: 'Platform' },
      { name: 'Team' },
      { name: 'Marketing' },
      { name: 'Community' },
    ],
  });

  // Tokenomics
  await prisma.tokenomics.createMany({
    data: [
      { coinId: 1, tokenomicsTypeId: 1, value: 0.1 },
      { coinId: 1, tokenomicsTypeId: 2, value: 0.2 },
      { coinId: 1, tokenomicsTypeId: 3, value: 0.3 },
      { coinId: 1, tokenomicsTypeId: 4, value: 0.4 },
      { coinId: 1, tokenomicsTypeId: 5, value: 0.5 },
      { coinId: 1, tokenomicsTypeId: 6, value: 0.6 },
      { coinId: 1, tokenomicsTypeId: 7, value: 0.7 },
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
      { coinId: 2, platformTypeId: 2, link: 'https://www.coinbase.com' },
      { coinId: 3, platformTypeId: 3, link: 'https://www.twitter.com' },
    ],
  });
  // BalanceTransactionType
  await prisma.balanceTransactionType.createMany({
    data: [{ name: 'Refund' }, { name: 'Invest' }, { name: 'Credit' }],
  });

  // InvestmentState
  await prisma.investmentState.createMany({
    data: [{ name: 'Pending' }, { name: 'Payout' }, { name: 'Balance' }, { name: 'Unconfirmed' }, { name: 'Failed' }],
  });

  // Continuing from the previous setup...

  // CoinCurrentState - Assuming Coin and CoinState IDs start at 1
  await prisma.coinCurrentState.createMany({
    data: [
      { coinId: 1, stateId: 1, validFrom: new Date('2023-01-01') },
      { coinId: 1, stateId: 2, validFrom: new Date('2024-01-02') },

      { coinId: 1, stateId: 3, validFrom: new Date('2024-09-02') },
      { coinId: 4, stateId: 2, validFrom: new Date('2024-01-05') },
      { coinId: 4, stateId: 3, validFrom: new Date('2025-01-05') },
      { coinId: 4, stateId: 4, validFrom: new Date('2025-12-05') },

      { coinId: 2, stateId: 1, validFrom: new Date('2023-01-03') },
      { coinId: 3, stateId: 1, validFrom: new Date('2023-01-04') },
      { coinId: 5, stateId: 5, validFrom: new Date('2023-01-06') },
    ],
  });

  // BalanceTransaction - Assuming BalanceTransactionType and Coin IDs are known
  await prisma.balanceTransaction.createMany({
    data: [
      {
        value: 100,
        transacted_at: new Date('2023-01-02'),
        userId: 1,
        typeId: 1,
        approved: true,
      },
      {
        value: 212,
        transacted_at: new Date('2024-01-02'),
        userId: 2,
        typeId: 3,
      },
      {
        value: 234,
        transacted_at: new Date('2024-01-02'),
        userId: 3,
        typeId: 2,
      },
    ],
  });

  // Investment and InvestmentCurrentState
  // Assuming IDs for user, coin, and investment state are known
  await prisma.investment.createMany({
    data: [
      {
        coinId: 1,
        userId: 1,
        placedAt: new Date('2023-01-05'),
        amount: 5000000000,
        signature: '0x823424234323',
        message: 'Hello',
      },
      {
        coinId: 2,
        userId: 1,
        placedAt: new Date('2023-01-03'),
        amount: 5000000000,
        signature: '0x82323',
        message: 'Hello',
      },
      {
        coinId: 2,
        userId: 4,
        placedAt: new Date('2023-01-29'),
        amount: 5000000000,
        signature: '0x23t8023423',
        message: 'Hello',
      },
      {
        coinId: 2,
        userId: 4,
        placedAt: new Date('2023-06-29'),
        amount: 5000000000,
        signature: '0x23423423',
        message: 'Hello',
      },
      {
        coinId: 3,
        userId: 3,
        placedAt: new Date('2023-01-01'),
        amount: 5000000000,
        signature: '0x82342323',
        message: 'Hello',
      },
      {
        coinId: 1,
        userId: 3,
        placedAt: new Date('2023-01-23'),
        amount: 5000000000,
        signature: '0x2342',
        message: 'Hello',
      },
      {
        coinId: 1,
        userId: 3,
        placedAt: new Date('2023-01-24'),
        amount: 5000000000,
        signature: '0x234sdfdsf2',
        message: 'Hello',
      },
      {
        coinId: 2,
        userId: 3,
        placedAt: new Date('2023-01-21'),
        amount: 5000000000,
        signature: '0x123452367890',
        message: 'Hello',
      },
      {
        coinId: 2,
        userId: 3,
        placedAt: new Date('2023-01-03'),
        amount: 5000000000,
        signature: '0x1234567890',
      },
    ],
  });

  await prisma.investmentCurrentState.createMany({
    data: [
      {
        coinId: 1,
        userId: 1,
        placedAt: new Date('2023-01-05'),
        investmentStateId: 1,
        validFrom: new Date('2023-01-06'),
      },
      {
        coinId: 2,
        userId: 1,
        placedAt: new Date('2023-01-03'),
        investmentStateId: 2,
        validFrom: new Date('2023-01-04'),
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

  // CoinCollectionItem
  await prisma.coinCollectionItem.createMany({
    data: [
      {
        coinId: 1,
        userId: 1,
      },
      {
        coinId: 2,
        userId: 4,
      },
      {
        coinId: 3,
        userId: 3,
      },
      {
        coinId: 1,
        userId: 3,
      },
    ],
  });

  console.log('All test data seeded successfully!');
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
