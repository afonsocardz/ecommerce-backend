import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { ProductEntity } from 'src/product/product.entity';
import { CartProductEntity } from '../entities/cart-product.entity';

export class CartProductDto implements Omit<CartProductEntity, 'userId'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: number;

  @ApiProperty({ type: [ProductEntity] })
  Product: Product;

  @ApiProperty()
  subtotal: number;
}
