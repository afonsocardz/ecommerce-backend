import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';

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

  async searchProducts(searchQuery: string): Promise<ProductEntity[]> {
    return await this.productRepository.searchProducts(searchQuery);
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.findAllProducts();
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    return await this.productRepository.findProductById(productId);
  }
}
