import { Router } from 'express';
import coinRoutes from './coins.route';

const router = Router();

router.use('/coins', coinRoutes);

export default router;
