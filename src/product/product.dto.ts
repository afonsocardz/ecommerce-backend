import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class SearchProductsDto {
  @IsString()
  @ApiProperty()
  search: string;
}
