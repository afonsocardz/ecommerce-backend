import { CartProductDto } from 'src/cart-products/dto/cart-product.dto';

export type TPreparedCartProducts = Omit<CartProductDto, 'Product'>;
