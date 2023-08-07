import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { OrdersService } from 'src/orders/orders.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
  ) {}

  async createPayment(userId: number, orderId: number) {
    const userPaymentMethod = 'paymentData';

    const order = await this.ordersService.findOrderOwner(orderId, userId);
    const user = await this.userService.findUserById(userId);

    const result = await this.fakePaymentGateway(userPaymentMethod);

    if (result === PaymentStatus.FAILED) {
      throw new UnauthorizedException();
    }

    await this.ordersService.completeOrder(orderId, userId);
    const emailUrl = await this.emailService.sendConfirmationEmail(
      user.email,
      order.id,
    );

    return { orderId, emailUrl: (emailUrl as string) ?? '' };
  }

  private async fakePaymentGateway(
    paymentData: string,
  ): Promise<PaymentStatus> {
    return PaymentStatus.SUCCESSFUL;
  }
}
