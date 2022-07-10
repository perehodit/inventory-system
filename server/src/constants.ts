import { Prisma } from '@prisma/client';

export const FIRST_USER: Prisma.UserCreateInput = {
  email: 'change@change.change',
  firstName: 'Change',
  lastName: 'Change',
  password: 'change',
  isAdministrator: true,
};
