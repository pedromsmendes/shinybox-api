import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import db from '@/db';
import RequestBodyError from '@/tools/errors/RequestBodyError';
import { invalidateRefreshToken, validRefreshToken } from '@/tools/tokenExpiracy';

import extractPropsBody, { Action, GrantType } from './helpers/extractPropsBody';
import createTokensAndReturn from './helpers/createTokensAndReturn';

import type { GrantReturn } from './types';

const grantRequest = async (req: Request, res: Response): Promise<Response<GrantReturn>> => {
  try {
    const {
      apiClientId,
      apiClientSecret,
      email,
      password,
      grantType,
      refreshToken,
    } = extractPropsBody(req, Action.GRANT);

    const apiClient = await db.apiClient.findUnique({ where: { id: apiClientId } });
    if (!apiClient || (apiClient && apiClient.secret !== apiClientSecret)) {
      throw new RequestBodyError([{
        code: 'INVALID_API_CLIENT_ID_OR_SECRET',
        msg: 'Invalid apiClientId or apiClientSecret',
      }]);
    }

    switch (grantType) {
      case GrantType.PASSWORD:
        if (!!email && !!password) {
          const user = await db.user.findUnique({
            where: { email },
            include: { role: true },
          });

          if (user && bcrypt.compareSync(password, user.password)) {
            return await createTokensAndReturn(
              apiClient.id,
              user.id,
              res,
            );
          }
        }

        throw new RequestBodyError([{
          code: 'INVALID_USERNAME_PASSWORD',
          msg: 'Invalid username or password',
        }]);

      case GrantType.REFRESH:
        if (refreshToken) {
          const token = await db.apiRefreshToken.findFirst({
            where: {
              id: refreshToken,
              apiClientId: apiClient.id,
            },
            include: { user: true },
          });

          if (!token || !validRefreshToken(token.expiracy)) {
            throw new RequestBodyError([{
              code: 'INVALID_REFRESH_TOKEN',
              msg: 'Invalid refresh_token',
            }]);
          }

          // all good, invalidate the refresh token by changing the expiracy
          await db.apiRefreshToken.update({
            where: { id: token.id },
            data: { expiracy: invalidateRefreshToken() },
          });

          return await createTokensAndReturn(
            apiClient.id,
            token.userId,
            res,
          );
        }

        throw new RequestBodyError([{
          code: 'MISSING_REFRESH_TOKEN',
          msg: 'Missing refresh_token',
        }]);

      default:
        throw new RequestBodyError([{
          code: 'INVALID_GRANT_TYPE',
          msg: 'Invalid grantType',
        }]);
    }
  } catch (ex) {
    console.trace('-- GRANT Exception --\n', ex);

    let ret: GrantReturn;
    if (ex instanceof RequestBodyError) {
      ret = {
        data: null,
        errors: ex.errors,
      };

      return res.status(400).json(ret);
    }

    ret = {
      data: null,
      errors: [{
        code: 'INTERNAL_SERVER_ERROR',
        msg: 'Internal server error. Try again later.',
      }],
    };

    return res.status(500).json(ret);
  }
};

export default grantRequest;
