import type { Request } from 'express';

import RequestBodyError from '@/tools/RequestBodyError';

export enum Action {
  GRANT = 'grant',
  LOGOUT = 'logout',
}

export enum GrantType {
  PASSWORD = 'password',
  REFRESH = 'refresh_token',
}

type Props = {
  apiClientId: string;
  apiClientSecret: string;
  email?: string;
  password?: string;
  grantType?: GrantType;
  accessToken?: string;
  refreshToken?: string;
};

const extractPropsBody = (req: Request, action: Action): Props => {
  const {
    apiClientId,
    apiClientSecret,
    email,
    password,
    grantType,
    accessToken,
    refreshToken,
  } = (req.body || {});

  const errors = new RequestBodyError();

  if (!apiClientId) {
    errors.push({
      code: 'MISSING_API_CLIENT_ID',
      msg: 'Missing apiClientId',
    });
  }

  if (!apiClientSecret) {
    errors.push({
      code: 'MISSING_API_CLIENT_SECRET',
      msg: 'Missing apiClientSecret',
    });
  }

  if (action === Action.GRANT && !grantType) {
    errors.push({
      code: 'MISSING_GRANT_TYPE',
      msg: 'Missing grantType',
    });
  }

  if (action === Action.LOGOUT) {
    if (!accessToken) {
      errors.push({
        code: 'MISSING_ACCESS_TOKEN',
        msg: 'Missing accessToken',
      });
    }

    if (!refreshToken) {
      errors.push({
        code: 'MISSING_REFRESH_TOKEN',
        msg: 'Missing refreshToken',
      });
    }
  }

  errors.throw();

  return {
    apiClientId,
    apiClientSecret,
    email,
    password,
    grantType,
    accessToken,
    refreshToken,
  };
};

export default extractPropsBody;
