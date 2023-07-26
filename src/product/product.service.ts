import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { FilterProductsDto } from './product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(
    name: string,
    price: number,
    description: string,
    imageUrl: string,
  ): Promise<ProductEntity> {
    return await this.productRepository.createProduct(
      name,
      price,
      description,
      imageUrl,
    );
  }

  async getProducts(
    filters: FilterProductsDto,
    skip: number,
    take: number,
  ): Promise<ProductEntity[]> {
    const where: Prisma.ProductWhereInput = {};

    if (filters.search?.length > 0) {
      where.name = {
        contains: filters.search,
        mode: 'insensitive',
      };
      where.description = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }

    return await this.productRepository.findAllProducts(take, skip, where);
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    return await this.productRepository.findProductById(productId);
  }
}
