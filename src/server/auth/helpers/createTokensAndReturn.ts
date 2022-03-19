import type { Response } from 'express';
import db from '@/db';

import type { GrantReturn } from '../types';

const createTokensAndReturn = async (
  apiClientId: string,
  userId: string,
  res: Response,
) => {
  const apiAccessToken = await db.apiAccessToken.create({
    data: {
      apiClientId,
      userId,
    },
  });
  const apiRefreshToken = await db.apiRefreshToken.create({
    data: {
      apiClientId,
      userId,
    },
  });

  const ret: GrantReturn = {
    errors: [],
    data: {
      accessToken: apiAccessToken.id,
      accessTokenExpiracy: apiAccessToken.expiracy!,
      refreshToken: apiRefreshToken.id,
      refreshTokenExpiracy: apiRefreshToken.expiracy!,
    },
  };

  return res.status(200).json(ret);
};

export default createTokensAndReturn;
