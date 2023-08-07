import {
  Controller,
  Post,
  Req,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthorizedRequest } from 'src/jwt/jwt.interface';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePaymentDto,
  CreatePaymentResponseDto,
} from './dto/create-payment.dto';

@Controller('payments')
@ApiTags('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatePaymentResponseDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: CreatePaymentDto })
  async createPayment(
    @Req() req: AuthorizedRequest,
    @Body() body: CreatePaymentDto,
  ) {
    const userId = req.userId;
    return await this.paymentsService.createPayment(userId, body.orderId);
  }
}
