import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductModule } from './product/product.module';
import { CartProductsModule } from './cart-products/cart-products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middlewares/jwt.middleware';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    CartProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'products', method: RequestMethod.GET },
      )
      .forRoutes('*');
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
