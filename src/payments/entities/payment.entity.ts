import { ApiProperty } from '@nestjs/swagger';
import { Payment, PaymentStatus } from '@prisma/client';

export class PaymentEntity implements Payment {
  @ApiProperty()
  id: number;
  @ApiProperty()
  status: PaymentStatus;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  orderId: number;
}
