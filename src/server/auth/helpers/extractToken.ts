import type { NextFunction } from 'express';
import type { RequestUser } from '@/server/types';

const extractToken = (req: RequestUser, _: any, next: NextFunction) => {
  if (req.headers) {
    if (req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        req.token = parts[1];
      }
    }
  }

  return next();
};

export default extractToken;
