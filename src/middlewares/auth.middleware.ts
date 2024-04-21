import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { response } from '@/lib/response.lib';

// const prisma = new PrismaClient();
export default class AuthMiddleware {
  //   async verifyAccess(req: Request, res: Response, next: NextFunction): Promise<void> {
  //     try {
  //       const token = req.headers.authorization?.split(' ')[1];
  //       if (!token) {
  //         res.status(StatusCodes.UNAUTHORIZED).json(response(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, null));
  //         return;
  //       }
  //       const decoded = verifyJWT(token);

  //       if (decoded.tokenType !== 'access_token') {
  //         res.status(StatusCodes.UNAUTHORIZED).json(response(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, null));
  //         return;
  //       }

  //       req.user = decoded;

  //       next();
  //     } catch (error) {
  //       res
  //         .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //         .json(response(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, null));
  //     }
  //   }

  //   async checkEmailVerified(req: Request, res: Response, next: NextFunction): Promise<void> {
  //     try {
  //       const user = await prisma.user.findUnique({
  //         where: {
  //           id: req.user.id,
  //         },
  //       });

  //       if (!user || !user.emailVerified) {
  //         res.status(StatusCodes.UNAUTHORIZED).json(response(StatusCodes.UNAUTHORIZED, 'Email not verified', null));
  //         return;
  //       }
  //       next();
  //     } catch (error) {
  //       res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  //     }
  //   }

  async checkApiKey(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const apiKey = req.headers['x-api-key'];
      if (!apiKey) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response(StatusCodes.UNAUTHORIZED, 'Piss of Asshole', null));
        return;
      }

      if (apiKey !== process.env.PLATFORM_API_KEY) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response(StatusCodes.UNAUTHORIZED, 'Piss of Asshole', null));
        return;
      }

      next();
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(response(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, null));
    }
  }
}
