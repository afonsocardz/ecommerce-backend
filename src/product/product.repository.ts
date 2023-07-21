import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async createProduct(name: string, price: number): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name,
        price,
      },
    });
  }
}
