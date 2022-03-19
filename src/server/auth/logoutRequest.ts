import type { Request, Response } from 'express';

import db from '@/db';
import RequestBodyError from '@/tools/RequestBodyError';

import extractPropsBody, { Action } from './helpers/extractPropsBody';
import type { LogoutReturn } from './types';

const logoutRequest = async (req: Request, res: Response) => {
  try {
    const {
      apiClientId,
      apiClientSecret,
      accessToken,
      refreshToken,
    } = extractPropsBody(req, Action.LOGOUT);

    const apiClient = await db.apiClient.findUnique({ where: { id: apiClientId } });
    if (!apiClient || (apiClient && apiClient.secret !== apiClientSecret)) {
      throw new RequestBodyError([{
        code: 'INVALID_API_CLIENT_ID_OR_SECRET',
        msg: 'Invalid apiClientId or apiClientSecret',
      }]);
    }

    await Promise.all([
      db.apiAccessToken.delete({ where: { id: accessToken } }),
      db.apiRefreshToken.delete({ where: { id: refreshToken } }),
    ]);

    const ret: LogoutReturn = {
      errors: [],
      sucess: true,
    };

    return res.status(200).json(ret);
  } catch (ex) {
    console.trace('-- LOGOUT Exception --\n', ex);

    let ret: LogoutReturn;
    if (ex instanceof RequestBodyError) {
      ret = {
        sucess: false,
        errors: ex.errors,
      };

      return res.status(400).json(ret);
    }

    ret = {
      sucess: false,
      errors: [{
        code: 'INTERNAL_SERVER_ERROR',
        msg: 'Internal server error. Try again later.',
      }],
    };

    return res.status(500).json(ret);
  }
};

export default logoutRequest;
