import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(name: string, price: number): Promise<Product> {
    return await this.productRepository.createProduct(name, price);
  }
}
