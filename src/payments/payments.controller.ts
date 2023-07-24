import {
  Controller,
  Post,
  Req,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthorizedRequest } from 'src/middlewares/jwt.interface';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
@ApiTags('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOkResponse()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: [CreatePaymentDto] })
  async createPayment(
    @Req() req: AuthorizedRequest,
    @Body() body: CreatePaymentDto,
  ) {
    const userId = req.userId;
    await this.paymentsService.createPayment(userId, body.orderId);
  }
}
