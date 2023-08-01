import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  getSecret(): string {
    return this.configService.get<string>('JWT_SECRET', 'secret');
  }

  getSmtp(): SMTPTransport.Options {
    const options: SMTPTransport.Options = {
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    };
    return options;
  }

  getOrigin(): string {
    return this.configService.get<string>('APP_URL');
  }
}
