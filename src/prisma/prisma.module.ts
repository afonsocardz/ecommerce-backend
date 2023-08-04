import { Module, Global, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DisconnectMiddleware } from './disconnect.middleware';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DisconnectMiddleware).forRoutes('*');
  }
}
