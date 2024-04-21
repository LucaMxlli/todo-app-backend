import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { response } from '@/lib/response.lib';
import { RefundRepo } from '@/repository/refund.repository';
import { IRefundController } from '@/interfaces/refund.interface';
import { UserRepo } from '@/repository/user.repository';
import { getBalances, getRefundHistory } from '@/lib/refund-calc';
import { getBalance } from '@/lib/wallet.lib';

const coinRepo = new RefundRepo();
const userRepo = new UserRepo();

export class RefundController implements IRefundController {
  async getRefundHistory(req: Request, res: Response): Promise<void> {
    try {
      const walletAddress = req.query.walletAddress as string;
      const user = await userRepo.getUserByWalletAddress(walletAddress);
      const refunds = await coinRepo.getRefundHistory(user.id);
      const calced = refunds.map((refund: any) => {
        return getRefundHistory(refund);
      });
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Refund history fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }

  async getBalance(req: Request, res: Response): Promise<void> {
    try {
      const walletAddress = req.query.walletAddress as string;
      const balance = await userRepo.getBalanceFromUser(walletAddress);
      // const walletBalance = await getBalance(walletAddress);
      const calced = getBalances(0, balance);
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Balance fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }
}
