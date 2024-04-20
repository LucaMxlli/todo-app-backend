require('dotenv').config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from '@/routes/routes';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { CoinRepo } from './repository/coin.repository';
import cron from 'node-cron';
import { CoinCronController } from './croncontrollers/transaction.controller';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const coincron = new CoinCronController();

app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use('*', (_req, res) => {
  res.status(404).json({ status: 404, message: '❌ Route not found!', data: null });
});

cron.schedule('*/30 * * * * *', async () => {
  await coincron.checkTransactions();
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
