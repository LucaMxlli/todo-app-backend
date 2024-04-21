import { Response, Request } from 'express';

export interface IRefundController {
  getRefundHistory(req: Request, res: Response): Promise<void>;
  getBalance(req: Request, res: Response): Promise<void>;
}

export interface IRefundRepo {
  getRefundHistory(userId: number): Promise<any>;
}
