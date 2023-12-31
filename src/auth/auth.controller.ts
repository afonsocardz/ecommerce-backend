import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse()
  async login(@Body() body: AuthDto, @Res() res: Response) {
    const { email, password } = body;

    const token = await this.authService.login(email, password);

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);

    return res
      .cookie('token', token, {
        expires: expirationDate,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .sendStatus(HttpStatus.OK);
  }

  @Get('status')
  @ApiOkResponse()
  status() {
    return;
  }

  @Get('logout')
  @ApiOkResponse()
  logout(@Res() res: Response) {
    return res
      .clearCookie('token', {
        path: '/',
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .sendStatus(HttpStatus.OK);
  }
}
