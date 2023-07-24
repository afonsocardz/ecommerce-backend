import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: process.env.EMAIL_EXAMPLE })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: process.env.STRONG_PASSWORD_EXAMPLE })
  password: string;
}
