import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  async validate(payload: any) {
    return await this.prisma.user.update({
      where: { id: payload.id },
      data: { lastVisit: new Date() },
      select: {
        id: true,
        isAdministrator: true,
        firstName: true,
        lastName: true,
        lastVisit: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
