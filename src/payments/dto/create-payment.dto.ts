import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  orderId: number;
}

export class CreatePaymentResponseDto {
  orderId: number;
  emailUrl: string;
}
