import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { CartProductRepository } from './cart-products.repository';
import { CartProductEntity } from './entities/cart-product.entity';
import { CartProductDto } from './dto/cart-product.dto';
import { Prisma } from '@prisma/client';
import { TCartProductReturnData } from './interfaces/cart-product.interface';

@Injectable()
export class CartProductsService {
  constructor(private readonly cartProductRepository: CartProductRepository) {}

  async create(
    { productId, quantity }: CreateCartProductDto,
    userId: number,
  ): Promise<CartProductEntity> {
    const result = await this.cartProductRepository.insertCartProduct(
      userId,
      productId,
      quantity,
    );

    if (result instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ConflictException();
    }

    return result;
  }

  async updateCartProductQty(
    cartProductId: number,
    qty: number,
    userId: number,
  ): Promise<void> {
    const { count: updateCount } =
      await this.cartProductRepository.updateCartProductQty(
        cartProductId,
        qty,
        userId,
      );
    if (updateCount === 0) {
      throw new NotFoundException();
    }
  }

  async findCartProducts(userId: number): Promise<CartProductDto[]> {
    const cartProducts = await this.cartProductRepository.findCartProducts(
      userId,
    );

    return this.calculateSubtotal(cartProducts);
  }

  async findOne(userId: number, productId: number) {
    return await this.cartProductRepository.findOne(productId, userId);
  }

  private calculateSubtotal(
    cartProducts: TCartProductReturnData[],
  ): CartProductDto[] {
    return cartProducts.map<CartProductDto>((item) => ({
      ...item,
      subtotal: item.quantity * item.Product.price,
    }));
  }

  async remove(cartProductId: number, userId: number): Promise<void> {
    const { count: deletedCount } =
      await this.cartProductRepository.removeCartProduct(cartProductId, userId);
    if (deletedCount === 0) {
      throw new NotFoundException();
    }
  }

  async clearCart(userId: number) {
    const { count } = await this.cartProductRepository.clearCart(userId);
    if (count === 0) {
      throw new NotFoundException();
    }
  }
}
