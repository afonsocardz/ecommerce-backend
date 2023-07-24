import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { CartProductsService } from 'src/cart-products/cart-products.service';
import { CartProductDto } from 'src/cart-products/dto/cart-product.dto';
import { TPreparedCartProducts } from './interfaces/orders.interface';
import { ProductEntity } from 'src/product/product.entity';

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
    await this.ordersRepository.createOrder(
      userId,
      totalAmount,
      preparedProducts,
    );
  }

  prepareCartProducts(products: CartProductDto[]): TPreparedCartProducts[] {
    return products.map<TPreparedCartProducts>(
      ({ Product, ...rest }: CartProductDto) => rest,
    );
  }

  calculateTotal(products: CartProductDto[]): number {
    const subTotals = products.map(
      (product: CartProductDto) => product.subtotal,
    );
    const totalAmount = subTotals.reduce(
      (previous: number, current: number) => previous + current,
    );
    return totalAmount;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
