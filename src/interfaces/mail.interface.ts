import { Request, Response } from "express";

export interface IMailController {
  sendEmailVerificationMail(token: string, id: number): Promise<void>;

  sendMailContact(req: Request, res: Response): Promise<any>;
  sendEmailVerifiedMail(id: number): Promise<void>;
}
