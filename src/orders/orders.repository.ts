import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  OrderWitProducts,
  TPreparedCartProducts,
} from './interfaces/orders.interface';
import { OrderStatus, Prisma } from '@prisma/client';
import { CreatedOrderDto } from './dto/order.dto';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(
    userId: number,
    totalAmount: number,
    products: TPreparedCartProducts[],
  ): Promise<CreatedOrderDto> {
    return await this.prisma.order.create({
      data: {
        userId,
        totalAmount,
        OrderProduct: {
          createMany: {
            data: products,
          },
        },
      },
      select: { id: true },
    });
  }

  async completeOrder(
    orderId: number,
    userId: number,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.order.updateMany({
      where: {
        id: orderId,
        userId,
      },
      data: {
        status: OrderStatus.COMPLETED,
      },
    });
  }

  async findUserOrder(
    userId: number,
    orderId: number,
  ): Promise<OrderWitProducts> {
    return await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      select: {
        id: true,
        totalAmount: true,
        status: true,
        OrderProduct: {
          include: {
            Product: true,
          },
        },
      },
    });
  }
}
