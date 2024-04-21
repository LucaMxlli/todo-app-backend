import { Router } from 'express';

import { RefundController } from '@/controllers/refund.controller';

const { getRefundHistory, getBalance } = new RefundController();

const router = Router();

// TODO: Implement middleware 
router.get('/', getBalance);
router.get('/history', getRefundHistory);

export default router;
