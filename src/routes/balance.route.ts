import { Router } from 'express';

import { RefundController } from '@/controllers/refund.controller';

const { getRefundHistory, getBalance, requestRefund } = new RefundController();

const router = Router();

// TODO: Implement middleware
router.get('/', getBalance);
router.get('/history', getRefundHistory);
router.post('/requests', requestRefund);


export default router;
