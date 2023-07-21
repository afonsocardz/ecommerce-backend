import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProdutoController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() body: { name: string; price: number },
  ): Promise<Product> {
    const { name, price } = body;
    return this.productService.createProduct(name, price);
  }
}
