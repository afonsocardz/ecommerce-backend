import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderStatus } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  status: OrderStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: number;
}
