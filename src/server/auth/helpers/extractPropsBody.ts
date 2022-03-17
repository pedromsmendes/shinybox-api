import type { Request } from 'express';

import RequestBodyError from '@/tools/RequestBodyError';

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

const extractPropsBody = (req: Request): Props => {
  const {
    apiClientId,
    apiClientSecret,
    email,
    password,
    grantType,
    accessToken,
    refreshToken,
  } = (req.body || {});

  if (!apiClientId) {
    throw new RequestBodyError({
      code: 'MISSING_API_CLIENT_ID',
      msg: 'Missing apiClientId',
    });
  }

  if (!apiClientSecret) {
    throw new RequestBodyError({
      code: 'MISSING_API_CLIENT_SECRET',
      msg: 'Missing apiClientSecret',
    });
  }

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
