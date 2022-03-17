import type { NextFunction } from 'express';
import type { RequestUser } from '@/server/types';
import db from '@/db';

const injectUser = async (req: RequestUser, _: any, next: NextFunction) => {
  if (!req.token) {
    return next();
  }

  const token = await db.apiAccessToken.findFirst({
    where: {
      id: req.token,
      expiracy: { gt: new Date() },
    },
    include: {
      user: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!token || !token.user) {
    return next();
  }

  req.user = token.user;

  return next();
};

export default injectUser;
