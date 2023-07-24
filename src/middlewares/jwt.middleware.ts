// jwt.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appService: AppService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const cookie = req.headers.cookie;

    if (!cookie) {
      throw new UnauthorizedException();
    }

    const token = cookie.replace('token=', '');

    try {
      const secret = this.appService.getSecret();
      const payload = this.jwtService.verify(token, { secret });
      req['userId'] = payload['sub'];
    } catch (err) {
      throw new UnauthorizedException(err);
    }

    next();
  }
}
