import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    BcryptService,
    JwtService,
    PrismaService,
    AppService,
  ],
})
export class AuthModule {}
