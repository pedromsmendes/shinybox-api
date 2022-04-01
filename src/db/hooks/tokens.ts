import { Prisma } from '@prisma/client';

import { accessTokenExpiracy, refreshTokenExpiracy } from '@/tools/tokenExpiracy';

const tokens = (params: Prisma.MiddlewareParams) => {
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

  return params;
};

export default tokens;
