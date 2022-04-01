import { PrismaClient } from '@prisma/client';

import initialData from './initialData';
import tokens from './hooks/tokens';
import user from './hooks/user';
import logs from './hooks/logs';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  tokens(params);

  await user(params);

  const result = await next(params);

  // always the last one
  await logs(params, result);

  return result;
});

export { initialData };

export default prisma;
