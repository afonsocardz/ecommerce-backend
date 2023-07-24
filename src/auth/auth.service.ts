import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.validateUser(email, password);
    return await this.createToken(user.id);
  }

  private async createToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    const secret = this.appService.getSecret();
    return this.jwtService.signAsync(payload, { secret });
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await this.bcryptService.comparePassword(password, hash);
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
