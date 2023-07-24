import { CartProductEntity } from '../entities/cart-product.entity';

export type TCartProductReturnData = Omit<CartProductEntity, 'userId'>;
