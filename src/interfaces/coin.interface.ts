import { Coin, CoinCurrentState, CoinState } from '@prisma/client';
import { Response, Request } from 'express';

export interface ICoinController {
  getCoins(req: Request, res: Response): Promise<void>;
  getCoinById(req: Request, res: Response): Promise<void>;
  getFeaturedCoins(req: Request, res: Response): Promise<void>;
  getCoinContribtion(req: Request, res: Response): Promise<void>;
  createCoin(req: Request, res: Response): Promise<void>;
  updateSPLCoin(req: Request, res: Response): Promise<void>;
  updatePool(req: Request, res: Response): Promise<void>;
  updateCoinDetails(req: Request, res: Response): Promise<void>;
}

export interface ICoinRepo {
  getCurrentState(coinId: number): Promise<CoinState>;
  checkCoinExists(coinId: number): Promise<boolean>;
  getCoins(state: string): Promise<Coin[]>;
  getCoinById(coinId: number): Promise<Coin>;
  getFeaturedCoins(): Promise<Coin[]>;
  setCurrentState(coinId: number, state: string, date?: Date): Promise<Coin>;
}

export interface ICoinCronController {}
