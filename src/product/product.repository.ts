import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductEntity } from './product.entity';

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

  async searchProducts(searchQuery: string): Promise<ProductEntity[]> {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
    });
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return this.prisma.product.findMany({});
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    return this.prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
  }
}
