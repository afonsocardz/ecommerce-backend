import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { EmailService } from './email.service';

@Module({
  providers: [AppService, EmailService],
  exports: [EmailService],
})
export class EmailModule {}
