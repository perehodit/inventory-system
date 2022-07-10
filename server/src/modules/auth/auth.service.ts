import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { verifyPassword } from 'src/utils';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        password: true,
      },
    });

    const passwordIsCorrect = await verifyPassword(user.password, dto.password);

    if (!user || !passwordIsCorrect) {
      throw new BadRequestException('Bad credentials');
    }

    const payload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async changePassword(dto: ChangePasswordDto, user: User) {
    // TODO: add email confirmation

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: dto.password },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User with this id not found');
      }

      throw new InternalServerErrorException();
    }
  }
}
