import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: config.auth.secret,
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
