import { Request } from 'express';

export interface AuthorizedRequest extends Request {
  userId: number;
}

export interface JwtPayload {
  sub: number;
}
