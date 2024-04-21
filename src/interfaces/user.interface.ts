import { Response, Request } from 'express';
import { syncBuiltinESMExports } from 'module';

export interface IUserController {
  registerUser(req: Request, res: Response): Promise<void>;
}

export interface IUserRepo {
  getUserByWalletAddress(walletAddress: string): Promise<any>;
  registerUser(walletAddress: string): Promise<any>;
}
