import type { Response } from 'express';
import db from '@/db';

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

  // return the new tokens
  return res.status(200).json({
    error: [],
    data: {
      accessToken: apiAccessToken.id,
      accessTokenExpiracy: apiAccessToken.expiracy,
      refreshToken: apiRefreshToken.id,
      refreshTokenExpiracy: apiRefreshToken.expiracy,
    },
  });
};

export default createTokensAndReturn;
