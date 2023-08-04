import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { CartProductsModule } from 'src/cart-products/cart-products.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  exports: [OrdersService],
  imports: [CartProductsModule, PrismaModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
