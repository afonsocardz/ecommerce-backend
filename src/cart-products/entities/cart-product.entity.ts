import { ApiProperty } from '@nestjs/swagger';
import { CartProduct, Product } from '@prisma/client';
import { ProductEntity } from 'src/product/product.entity';

export class CartProductEntity implements CartProduct {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty({ type: [ProductEntity] })
  Product: Product;
}
