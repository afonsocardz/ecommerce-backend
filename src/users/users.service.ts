import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly prisma: PrismaService,
  ) {}

  async create({ email, password }: CreateUserDto) {
    await this.isEmailTaken(email);
    const hashedPassword = await this.bcryptService.hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  private async isEmailTaken(email: string) {
    const user = await this.findUserByEmail(email);
    if (user) throw new ConflictException();
  }
}
