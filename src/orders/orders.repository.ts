import { CartProductDto } from 'src/cart-products/dto/cart-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TPreparedCartProducts } from './interfaces/orders.interface';

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
}
