import { ApiProperty } from '@nestjs/swagger';
import { CartProduct, Product } from '@prisma/client';
import { ProductEntity } from 'src/product/product.entity';

export class CartProductDto implements CartProduct {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: [ProductEntity] })
  Product: Product;

  @ApiProperty()
  subtotal: number;
}
