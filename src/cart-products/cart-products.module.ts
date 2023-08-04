import { Module } from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { CartProductsController } from './cart-products.controller';
import { CartProductRepository } from './cart-products.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CartProductsController],
  providers: [CartProductsService, CartProductRepository],
  exports: [CartProductsService],
})
export class CartProductsModule {}
