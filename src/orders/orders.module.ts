import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderRepository } from './orders.repository';
import { CartProductsModule } from 'src/cart-products/cart-products.module';

@Module({
  exports: [OrdersService],
  imports: [CartProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrderRepository],
})
export class OrdersModule {}
