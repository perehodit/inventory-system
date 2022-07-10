import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { generatePassword } from 'src/utils';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdministrator: true,
        lastVisit: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdministrator: true,
        lastVisit: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new NotFoundException('User with this id not found');

    return user;
  }

  async create(dto: CreateUserDto) {
    const isUserExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (isUserExists) throw new BadRequestException('User already exists');

    const password = generatePassword();

    // TODO: send message with password and remove console.debug

    console.debug(password);

    return await this.prisma.user.create({
      data: { ...dto, password },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        lastVisit: true,
        isAdministrator: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async resetPassword(userId: string) {
    const password = generatePassword();

    // TODO: send message with password, remove console.debug, and delete password return

    console.debug(password);

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { password },
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

    return { password };
  }

  async updateById(dto: UpdateUserDto, userId: string) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: dto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException('User with this id not found');
          case 'P2002':
            throw new BadRequestException(
              'User with this email already exists',
            );
          default:
            throw new InternalServerErrorException();
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async deleteById(userId: string) {
    try {
      await this.prisma.user.delete({ where: { id: userId } });
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
