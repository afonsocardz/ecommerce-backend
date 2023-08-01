import { ApiProperty } from '@nestjs/swagger';
import {
  OrderProductWithProduct,
  OrderWitProducts,
} from '../interfaces/orders.interface';
import { Order } from '@prisma/client';

export class OrderWithProductDto implements OrderWitProducts {
  @ApiProperty()
  id: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  OrderProduct: OrderProductWithProduct[];
}

export class CreatedOrderDto implements Pick<Order, 'id'> {
  @ApiProperty()
  id: number;
}
