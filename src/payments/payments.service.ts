import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly ordersService: OrdersService) {}

  async createPayment(userId: number, orderId: number) {
    const userPaymentMethod = 'paymentData';

    await this.ordersService.findOrderOwner(orderId, userId);

    const result = await this.fakePaymentGateway(userPaymentMethod);

    if (result === PaymentStatus.SUCCESSFUL) {
      this.ordersService.completeOrder(orderId, userId);
    }
  }

  private async fakePaymentGateway(
    paymentData: string,
  ): Promise<PaymentStatus> {
    return PaymentStatus.SUCCESSFUL;
  }
}
