import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function truncateTables() {
  const tables = ['User', 'ToDo'];
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
        email: 'lucamal3d@gmail.com',
        name: 'Luca',
        password: 'password',
      },
      {
        email: 'test@gmail.com',
        name: 'Test',
        password: 'password',
      },
    ],
  });

  await prisma.toDo.createMany({
    data: [
      {
        title: 'Buy milk',
        description: 'Buy milk from the store',
        userId: 1,
        done: true,
      },
      {
        title: 'Buy bread',
        description: 'Buy bread from the store',
        userId: 1,
      },
      {
        title: 'Buy eggs',
        description: 'Buy eggs from the store',
        userId: 2,
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
