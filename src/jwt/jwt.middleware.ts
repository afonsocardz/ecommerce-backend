import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomJwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: CustomJwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const cookie = req.headers.cookie;

    const token = this.jwtService.extractToken(cookie);

    const payload = this.jwtService.verifyToken(token);

    req['userId'] = payload.sub;

    next();
  }
}
