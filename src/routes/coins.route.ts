import { Router } from 'express';
import AuthMiddleware from '@/middlewares/auth.middleware';
import { CoinController } from '@/controllers/coin.controller';

const { getCoins, getCoinById, getFeaturedCoins, getInvestmentOfCoin, getCoinContribution } = new CoinController();

const router = Router();

//Without middleware
router.get('/', getCoins);
router.get('/:id/investments', getInvestmentOfCoin);
router.get('/:id/contribution', getCoinContribution);
router.get('/featured', getFeaturedCoins);
router.get('/:id', getCoinById);

export default router;
