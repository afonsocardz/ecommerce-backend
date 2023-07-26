import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;
}

export class FilterProductsDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  search?: string;
}
