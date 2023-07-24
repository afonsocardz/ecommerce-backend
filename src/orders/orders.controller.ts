import { Controller, Get, Post, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthorizedRequest } from 'src/middlewares/jwt.interface';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse()
  async create(@Req() req: AuthorizedRequest) {
    const userId = req.userId;
    await this.ordersService.create(userId);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}
