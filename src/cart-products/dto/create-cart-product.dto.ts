import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCartProductDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  productId: number;
}
