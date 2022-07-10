import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @Post('change-password')
  changePassword(@Body() dto: ChangePasswordDto, @GetUser() user: User) {
    return this.authService.changePassword(dto, user);
  }
}
