// disconnect.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestScopedPrismaService } from './scoped-request-prisma.service';

@Injectable()
export class DisconnectMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: RequestScopedPrismaService) {}

  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      this.prismaService.disconnect();
    });
    next();
  }
}
