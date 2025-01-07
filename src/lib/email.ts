import nodemailer from 'nodemailer';
interface EmailParams {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: EmailParams) => {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transporter = nodemailer.createTransport({
    service: 'smtp',
    host: process.env.SMTP_HOST ?? '',
    port: Number(process.env.SMTP_PORT) ?? NaN,
    auth: {
      user: process.env.SMTP_USER ?? '',
      pass: process.env.SMTP_PASS ?? ''
    }
  });
  transporter.sendMail({
    from: process.env.FROM_EMAIL, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html: text // html body
  });
};
