import { Router } from 'express';
import balanceRoutes from './balance.route';
import coinRoutes from './coins.route';
import userRoutes from './user.route';

const router = Router();

router.use('/coins', coinRoutes);
router.use('/balance', balanceRoutes);
router.use('/user', userRoutes);

export default router;
