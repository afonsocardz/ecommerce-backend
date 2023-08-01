import { Controller, Get, Post, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthorizedRequest } from 'src/jwt/jwt.interface';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreatedOrderDto, OrderWithProductDto } from './dto/order.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Creates checkout order' })
  @ApiCreatedResponse({ type: [CreatedOrderDto] })
  async create(@Req() req: AuthorizedRequest) {
    const userId = req.userId;
    return await this.ordersService.create(userId);
  }

  @Get(':orderId')
  @ApiOkResponse({ type: [OrderWithProductDto] })
  async getOrderById(
    @Param('orderId') orderId: string,
    @Req() req: AuthorizedRequest,
  ) {
    const userId = req.userId;
    return await this.ordersService.findOrderOwner(+orderId, userId);
  }
}
