import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: process.env.EMAIL_EXAMPLE })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ example: process.env.STRONG_PASSWORD_EXAMPLE })
  password: string;
}
