import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(name: string, price: number): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name,
        price,
      },
    });
  }
}
