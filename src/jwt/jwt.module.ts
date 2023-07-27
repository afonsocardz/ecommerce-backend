import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomJwtService } from './jwt.service';
import { AppService } from 'src/app.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from './jwt.middleware';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  providers: [CustomJwtService, AppService, JwtService],
})
export class CustomJwtModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'products', method: RequestMethod.GET },
        'auth/login',
      )
      .forRoutes('*');
  }
}
