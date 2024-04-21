import { Coin, CoinCurrentState, CoinState, PlatformLink, Tokenomics } from '@prisma/client';
import { Response, Request } from 'express';

export interface ICoinController {
  getCoins(req: Request, res: Response): Promise<void>;
  getCoinById(req: Request, res: Response): Promise<void>;
  getOwnCoins(req: Request, res: Response): Promise<void>;
  getFeaturedCoins(req: Request, res: Response): Promise<void>;
  getCoinContribution(req: Request, res: Response): Promise<void>;
  getInvestmentOfCoin(req: Request, res: Response): Promise<void>;
  // createCoin(req: Request, res: Response): Promise<void>;
  // updateSPLCoin(req: Request, res: Response): Promise<void>;
  // updatePool(req: Request, res: Response): Promise<void>;
  // updateCoinDetails(req: Request, res: Response): Promise<void>;
}

export interface ICoinRepo {
  getCurrentState(coinId: number): Promise<any>;
  checkCoinExists(coinId: number): Promise<boolean>;
  getCoins(state: string): Promise<any>;
  getOwnCoins(walletAddress: string): Promise<any>;
  getCoinById(coinId: number): Promise<any>;
  getFeaturedCoins(): Promise<any>;
  setCurrentState(coinId: number, state: string, date?: Date): Promise<any>;
  getTokenomics(coinId: number): Promise<any>;
  getSocials(coinId: number): Promise<any>;
  getCoinInvestments(coinId: number, target?: boolean): Promise<any>;
}

export interface ICoinCronController {}
