import { Controller, Get, Post, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthorizedRequest } from 'src/jwt/jwt.interface';
import { ApiCreatedResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Creates checkout order' })
  @ApiCreatedResponse()
  async create(@Req() req: AuthorizedRequest) {
    const userId = req.userId;
    await this.ordersService.create(userId);
  }
}
