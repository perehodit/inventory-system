import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FIRST_USER } from 'src/constants';
import { hashPassword } from 'src/utils';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$use(async (params, next) => {
      if (
        (params.action === 'create' || params.action === 'update') &&
        params.model === 'User'
      ) {
        if (params.args.data.password) {
          const user = params.args.data;
          const hash = await hashPassword(user.password);

          user.password = hash;

          params.args.data = user;
        }
      }

      return next(params);
    });

    await this.$connect();

    // create first user
    const usersCount = await this.user.count();
    if (usersCount === 0) {
      const user = await this.user.create({ data: FIRST_USER });

      if (!user) {
        throw new Error(`Can't create first user`);
      }
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => await app.close());
  }
}
