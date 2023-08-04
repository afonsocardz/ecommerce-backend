import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class RequestScopedPrismaService extends PrismaService {
  async disconnect() {
    await this.$disconnect();
  }
}
