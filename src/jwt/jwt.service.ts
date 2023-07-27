import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { JwtPayload } from './jwt.interface';

@Injectable()
export class CustomJwtService {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  extractToken(cookie: string): string {
    if (!cookie) {
      throw new UnauthorizedException();
    }
    return cookie.replace('token=', '');
  }

  verifyToken(token: string): JwtPayload {
    try {
      const secret = this.appService.getSecret();
      const payload = this.jwtService.verify<JwtPayload>(token, { secret });
      return payload;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
