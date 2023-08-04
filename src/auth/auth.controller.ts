// auth.controller.ts
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.sendStatus(HttpStatus.OK);
  }

  @Get('status')
  @ApiOkResponse()
  status() {
    return;
  }

  @Get('logout')
  @ApiOkResponse()
  logout(@Res() res: Response) {
    res.clearCookie('token', { path: '/' });
    return res.sendStatus(HttpStatus.OK);
  }
}
