import { Request, Response } from 'express';
import { ICoinController } from '@/interfaces/coin.interface';
import { StatusCodes } from 'http-status-codes';
import { response } from '@/lib/response.lib';
import { CoinRepo } from '@/repository/coin.repository';
import { getCoinDetail, getCoinOverview } from '@/lib/funding-calc';

const coinRepo = new CoinRepo();

export class CoinController implements ICoinController {
  async getCoins(req: Request, res: Response): Promise<void> {
    try {
      const coins = await coinRepo.getCoins('active'); // TODO: Filter einrichten wieder, maybe mit einem custom select statement weil i prisma nd trust und halt wieder query params
      const calced = coins.map((coin: any) => {
        return getCoinOverview(coin);
      });
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Coins fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }

  async getCoinById(req: Request, res: Response): Promise<void> {
    try {
      const coinId = parseInt(req.params.coinId);

      if (isNaN(coinId)) {
        throw new Error('Invalid coin id');
      }

      const coin = await coinRepo.getCoinById(coinId);
      const calced = getCoinDetail(coin);
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Coin fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }

  async getOwnCoins(req: Request, res: Response): Promise<void> {
    try {
      const walletAddress = req.query.walletAddress as string;
      const coins = await coinRepo.getOwnCoins(walletAddress);
      const calced = coins.map((coin: any) => {
        return getCoinOverview(coin);
      });
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Coins fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }

  async getFeaturedCoins(req: Request, res: Response): Promise<void> {
    try {
      const coins = await coinRepo.getFeaturedCoins();
      const calced = coins.map((coin: any) => {
        return getCoinOverview(coin);
      });
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Coins fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }

  async getCoinContribtion(req: Request, res: Response): Promise<void> {
    try {
      const walletAddress = req.query.walletAddress as string;
      const coins = await coinRepo.getOwnCoins(walletAddress);
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Coins fetched successfully', coins));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }
}
