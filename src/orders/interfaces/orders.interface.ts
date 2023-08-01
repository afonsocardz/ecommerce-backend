import { Prisma } from '@prisma/client';
import { CartProductDto } from 'src/cart-products/dto/cart-product.dto';

export type TPreparedCartProducts = Omit<CartProductDto, 'Product' | 'id'>;

export type OrderWitProducts = Prisma.OrderGetPayload<{
  select: {
    id: true;
    totalAmount: true;
    OrderProduct: {
      include: {
        Product: true;
      };
    };
  };
}>;

export interface OrderProductWithProduct
  extends Prisma.OrderProductGetPayload<{
    include: { Product: true };
  }> {}
