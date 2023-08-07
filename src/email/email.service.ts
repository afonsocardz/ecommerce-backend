import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { BadGatewayException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prismaService: PrismaService) {}

  async sendConfirmationEmail(email: string, orderNumber: number) {
    try {
      const mailOptions = {
        from: 'noreply@example.com',
        to: email,
        subject: 'Order Confirmation',
        text: `Thank you for your purchase. Your order number is: ${orderNumber}.`,
      };

      const transporter = await this.createTransporter();

      const info = await transporter.sendMail(mailOptions);
      return nodemailer.getTestMessageUrl(info);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw new BadGatewayException();
    }
  }

  async createTransporter() {
    const { value } = await this.prismaService.config.findFirst({
      where: {
        key: 'email',
      },
    });

    const credentials = JSON.parse(value as string) as nodemailer.TestAccount;

    const transporter = nodemailer.createTransport({
      host: credentials.smtp.host,
      auth: {
        user: credentials.user,
        pass: credentials.pass,
      },
      port: credentials.smtp.port,
    });

    return transporter;
  }
}
