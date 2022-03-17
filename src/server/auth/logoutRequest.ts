import type { Request, Response } from 'express';

import db from '@/db';
import RequestBodyError from '@/tools/RequestBodyError';

import extractPropsBody, { Action } from './helpers/extractPropsBody';

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

    return res.status(200).json({ success: true });
  } catch (ex) {
    if (ex instanceof RequestBodyError) {
      return res.status(400).json({
        data: null,
        error: ex.errors,
      });
    }

    console.trace('-- LOGOUT Exception --\n', ex);
    return res.status(500).json({
      data: null,
      error: [{
        code: 'INTERNAL_SERVER_ERROR',
        msg: 'Internal server error. Try again later.',
      }],
    });
  }
};

export default logoutRequest;