import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TPreparedCartProducts } from './interfaces/orders.interface';
import { OrderStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(
    userId: number,
    totalAmount: number,
    products: TPreparedCartProducts[],
  ) {
    await this.prisma.order.create({
      data: {
        userId,
        totalAmount,
        OrderProduct: {
          createMany: {
            data: products,
          },
        },
      },
    });
  }

  async completeOrder(orderId: number): Promise<Prisma.BatchPayload> {
    return await this.prisma.order.updateMany({
      where: {
        id: orderId,
      },
      data: {
        status: OrderStatus.COMPLETED,
      },
    });
  }
}
