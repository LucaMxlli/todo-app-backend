import { Router } from 'express';
import AuthMiddleware from '@/middlewares/auth.middleware';
import { CoinController } from '@/controllers/coin.controller';

const { getCoins, getCoinById } = new CoinController();

const router = Router();

//Without middleware
router.get('/', getCoins);
router.get('/:coinId', getCoinById);

export default router;
