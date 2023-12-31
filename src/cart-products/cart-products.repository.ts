import { PrismaService } from 'src/prisma/prisma.service';
import { CartProductEntity } from './entities/cart-product.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TCartProductReturnData } from './interfaces/cart-product.interface';

@Injectable()
export class CartProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insertCartProduct(
    userId: number,
    productId: number,
    quantity?: number,
  ): Promise<CartProductEntity | PrismaClientKnownRequestError> {
    try {
      return await this.prisma.cartProduct.create({
        data: {
          quantity,
          userId,
          productId,
        },
        include: {
          Product: true,
        },
      });
    } catch (error) {
      return error as PrismaClientKnownRequestError;
    }
  }

  async findCartProducts(userId: number): Promise<TCartProductReturnData[]> {
    const cartProducts = await this.prisma.cartProduct.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        productId: true,
        quantity: true,
        Product: true,
      },
    });
    return cartProducts;
  }

  async findOne(productId: number, userId: number) {
    return await this.prisma.cartProduct.findFirst({
      where: {
        userId,
        productId,
      },
      select: {
        id: true,
        productId: true,
        quantity: true,
        Product: true,
      },
    });
  }

  async updateCartProductQty(
    productId: number,
    quantity: number,
    userId: number,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.cartProduct.updateMany({
      where: {
        productId,
        userId,
      },
      data: {
        quantity,
      },
    });
  }

  async removeCartProduct(
    productId: number,
    userId: number,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.cartProduct.deleteMany({
      where: {
        productId,
        userId,
      },
    });
  }

  async clearCart(userId: number): Promise<Prisma.BatchPayload> {
    return await this.prisma.cartProduct.deleteMany({
      where: {
        userId,
      },
    });
  }
}
