import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsAdministrator, JwtGuard } from '../auth/guards';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get(':userId')
  getById(@Param('userId') userId: string) {
    return this.usersService.getById(userId);
  }

  @UseGuards(JwtGuard, IsAdministrator)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtGuard, IsAdministrator)
  @Post(':userId/reset-password')
  resetPassword(@Param('userId') userId: string) {
    return this.usersService.resetPassword(userId);
  }

  @UseGuards(JwtGuard, IsAdministrator)
  @Patch(':userId')
  updateById(@Body() dto: UpdateUserDto, @Param('userId') userId: string) {
    return this.usersService.updateById(dto, userId);
  }

  @UseGuards(JwtGuard, IsAdministrator)
  @Delete(':userId')
  deleteById(@Param('userId') userId: string) {
    return this.usersService.deleteById(userId);
  }
}
