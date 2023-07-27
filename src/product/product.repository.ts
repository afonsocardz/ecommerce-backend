import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductEntity } from './product.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(
    name: string,
    price: number,
    description: string,
    imageUrl: string,
  ): Promise<ProductEntity> {
    return this.prisma.product.create({
      data: {
        name,
        price,
        imageUrl,
        description,
      },
    });
  }

  async findAllProducts(
    take: number,
    skip: number,
    where: Prisma.ProductWhereInput,
  ): Promise<ProductEntity[]> {
    return await this.prisma.product.findMany({
      take,
      skip,
      where,
    });
  }

  async countAllProducts(where: Prisma.ProductWhereInput) {
    return await this.prisma.product.count({
      where,
    });
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    return await this.prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
  }
}
