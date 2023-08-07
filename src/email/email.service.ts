import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppService } from 'src/app.service';
import { BadGatewayException } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly appService: AppService) {
    this.transporter = nodemailer.createTransport(this.appService.getSmtp());
  }

  async sendConfirmationEmail(email: string, orderNumber: number) {
    try {
      const mailOptions = {
        from: 'noreply@example.com',
        to: email,
        subject: 'Order Confirmation',
        text: `Thank you for your purchase. Your order number is: ${orderNumber}.`,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return nodemailer.getTestMessageUrl(info);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw new BadGatewayException();
    }
  }
}
