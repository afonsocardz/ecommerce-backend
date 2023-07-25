import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: appService.getOrigin(),
    credentials: true,
  });

  const appModule = app.get(AppModule);
  appModule.configureSwagger(app);

  const port = appService.getPort();
  await app.listen(port);
}
bootstrap();
