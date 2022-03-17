import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { accessTokenExpiracy, refreshTokenExpiracy } from '@/tools/tokenExpiracy';

import initialData from './initialData';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === 'ApiAccessToken'
    && params.action === 'create'
    && !params.args?.data?.expiracy) {
    // eslint-disable-next-line no-param-reassign
    params.args.data.expiracy = accessTokenExpiracy();
  }

  if (params.model === 'ApiRefreshToken'
    && params.action === 'create'
    && !params.args?.data?.expiracy) {
    // eslint-disable-next-line no-param-reassign
    params.args.data.expiracy = refreshTokenExpiracy();
  }

  if (params.model === 'User'
    && (params.action === 'create' || params.action === 'createMany' || params.action === 'update')
    && params.args?.data) {
    if (Array.isArray(params.args?.data)) {
      for (let i = 0; i < params.args.data.length; i++) {
        const user = params.args.data[i];

        if (user.password) {
          // eslint-disable-next-line no-await-in-loop
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    } else if (params.args?.data?.password) {
      // eslint-disable-next-line no-param-reassign
      params.args.data.password = await bcrypt.hash(params.args.data.password, 12);
    }
  }

  return next(params);
});

export { initialData };

export default prisma;
