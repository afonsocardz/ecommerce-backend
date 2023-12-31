import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { CartProductsService } from 'src/cart-products/cart-products.service';
import { CartProductDto } from 'src/cart-products/dto/cart-product.dto';
import { TPreparedCartProducts } from './interfaces/orders.interface';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrderRepository,
    private readonly cartProductsService: CartProductsService,
  ) {}

  async create(userId: number) {
    const products = await this.cartProductsService.findCartProducts(userId);
    const totalAmount = this.calculateTotal(products);
    const preparedProducts = this.prepareCartProducts(products);
    return await this.ordersRepository.createOrder(
      userId,
      totalAmount,
      preparedProducts,
    );
  }

  private prepareCartProducts(
    products: CartProductDto[],
  ): TPreparedCartProducts[] {
    return products.map<TPreparedCartProducts>(
      ({ Product, id, ...rest }: CartProductDto) => rest,
    );
  }

  private calculateTotal(products: CartProductDto[]): number {
    const subTotals = products.map(
      (product: CartProductDto) => product.subtotal,
    );
    const totalAmount = subTotals.reduce(
      (previous: number, current: number) => previous + current,
    );
    return totalAmount;
  }

  async completeOrder(orderId: number, userId: number) {
    const result = await this.ordersRepository.completeOrder(orderId, userId);
    if (result.count === 0) {
      throw new NotFoundException();
    }
    await this.cartProductsService.clearCart(userId);
  }

  async findOrderOwner(orderId: number, userId: number) {
    const order = await this.ordersRepository.findUserOrder(userId, orderId);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }
}
