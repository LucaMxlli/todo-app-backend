import { IMailController } from "@/interfaces/mail.interface";
import { sendMail } from "@/lib/mail.lib";
import { response } from "@/lib/response.lib";
import {
  verifiedEmailTemplate,
  verifyEmailTemplate,
} from "@/utils/email-templates";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const replyMail = "Coustra - No Reply <noreply@coustra.com>";
const prisma = new PrismaClient();

export class MailController implements IMailController {
  async sendEmailVerificationMail(token: string, id: number): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return sendMail(
      replyMail,
      user?.email as string,
      "Email Verification",
      verifyEmailTemplate(token, user.name as string)
    );
  }

  async sendMailContact(req: Request, res: Response): Promise<any> {
    const { name, email, message } = req.body;

    await sendMail(
      replyMail,
      replyMail,
      "Contact Message",
      `Name: ${name} <br> Email: ${email} <br> Message: ${message}`
    );

    return res.status(200).json({
      message: "Message sent",
    });
  }

  async sendEmailVerifiedMail(id: number): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return sendMail(
      replyMail,
      user?.email as string,
      "Email Verified",
      verifiedEmailTemplate(user.name as string)
    );
  }
}
