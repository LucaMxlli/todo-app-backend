const nodemailer = require("nodemailer");

export const sendMail = (
  from: string,
  to: string,
  subject: string,
  html: string
): void => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "service.coustra",
      pass: "dseu hktv uvoy rpgk",
    },
  });

  let message = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  transporter
    .sendMail(message)
    .then((info: any) => {
      return true;
    })
    .catch((err: any) => {
      throw new Error(err);
    });
};
