import { Module } from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { CartProductsController } from './cart-products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartProductRepository } from './cart-products.repository';

@Module({
  controllers: [CartProductsController],
  providers: [CartProductsService, PrismaService, CartProductRepository],
  exports: [CartProductsService],
})
export class CartProductsModule {}
