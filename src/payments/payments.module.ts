import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { OrdersModule } from 'src/orders/orders.module';
import { EmailModule } from 'src/email/email.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [OrdersModule, EmailModule, UsersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
