import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './product.dto';
import {
  ApiOperation,
  ApiQuery,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Creates a product for e-commerce' })
  @ApiCreatedResponse({
    type: [ProductEntity],
  })
  @ApiQuery({
    name: 'Product',
    example: 'Samsung Laptop',
    description: 'Create a product',
  })
  async createProduct(@Body() body: CreateProductDto): Promise<Product> {
    const { name, price } = body;
    return this.productService.createProduct(name, price);
  }
}
