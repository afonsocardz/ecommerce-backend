import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from './prisma.service';

@Injectable()
export class DisconnectMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      this.prismaService.disconnect();
    });
    next();
  }
}
