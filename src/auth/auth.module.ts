import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, BcryptService, JwtService, AppService],
})
export class AuthModule {}
