import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { FilterProductsDto, ProductsResponse } from './product.dto';
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
    page: number,
    take: number,
  ): Promise<ProductsResponse> {
    const where: Prisma.ProductWhereInput = {};
    const skip = (page - 1) * take;

    if (filters.search?.length > 0) {
      where.OR = [
        {
          description: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const products = await this.productRepository.findAllProducts(
      take,
      skip,
      where,
    );

    const totalCount = await this.productRepository.countAllProducts(where);

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products,
    };
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    return await this.productRepository.findProductById(productId);
  }
}
