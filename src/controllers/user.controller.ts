import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { response } from '@/lib/response.lib';
import { UserRepo } from '@/repository/user.repository';
import { IUserController } from '@/interfaces/user.interface';

const userRepo = new UserRepo();

export class UserController implements IUserController {
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const walletAddress = req.body.walletAddress;
      const user = await userRepo.registerUser(walletAddress);
      res.status(StatusCodes.OK).json(response(StatusCodes.OK, 'User registered successfully', user));
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json(response(StatusCodes.BAD_REQUEST, error.message, null));
    }
  }
}
