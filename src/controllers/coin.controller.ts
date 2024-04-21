import { Request, Response } from 'express';
import { ICoinController } from '@/interfaces/coin.interface';
import { StatusCodes } from 'http-status-codes';
import { response } from '@/lib/response.lib';
import { CoinRepo } from '@/repository/coin.repository';
import { getCoinContribution, getCoinDetail, getCoinInvestment, getCoinOverview } from '@/lib/funding-calc';

const coinRepo = new CoinRepo();

export class CoinController implements ICoinController {
  async getCoins(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query.filter as string;
      let coins = [];
      if (filter?.toLocaleLowerCase() === 'upcoming') {
        coins = await coinRepo.getCoins('Upcoming');
      } else if (filter?.toLocaleLowerCase() === 'active') {
        coins = await coinRepo.getCoins('Active');
      } else {
        coins = await coinRepo.getCoins();
      }
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
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error('Invalid coin id');
      }

      const coin = await coinRepo.getCoinById(id);
      const calced = getCoinDetail(coin);
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Coin fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }

  async getOwnCoins(req: Request, res: Response): Promise<void> {
    try {
      const walletAddress = req.query.walletAddress as string;
      const filter = req.query.filter as string;
      let coins = [];
      if (filter === 'involved') {
        coins = await coinRepo.getInvolvedCoins(walletAddress);
      } else {
        coins = await coinRepo.getOwnCoins(walletAddress);
      }

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

  async getInvestmentOfCoin(req: Request, res: Response): Promise<void> {
    try {
      const coinId = parseInt(req.params.id);
      if (isNaN(coinId)) {
        throw new Error('Invalid coin id');
      }

      const investments = await coinRepo.getCoinInvestments(coinId);
      const calced = investments.map((investment: any) => {
        return getCoinInvestment(investment);
      });
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Investments fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }

  async getCoinContribution(req: Request, res: Response): Promise<void> {
    try {
      const walletAddress = req.query.walletAddress as string;
      const coins = await coinRepo.getOwnCoins(walletAddress);
      const calced = coins.map((coin: any) => {
        return getCoinContribution(coin);
      });
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'Coins fetched successfully', calced));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }
}
