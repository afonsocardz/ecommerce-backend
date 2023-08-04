import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductModule } from './product/product.module';
import { CartProductsModule } from './cart-products/cart-products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CustomJwtModule } from './jwt/jwt.module';
import { DisconnectMiddleware } from './prisma/disconnect.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    CartProductsModule,
    UsersModule,
    AuthModule,
    OrdersModule,
    PaymentsModule,
    CustomJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DisconnectMiddleware).forRoutes('*');
  }
  configureSwagger(app) {
    const options = new DocumentBuilder()
      .setTitle('E-commerce API')
      .setDescription('API para um sistema de E-commerce')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
