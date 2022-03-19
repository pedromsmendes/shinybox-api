export type RequestBodyErrorType = {
  code: string;
  msg: string;
};

export type TokenInfo = {
  accessToken: string;
  accessTokenExpiracy: Date;
  refreshToken: string;
  refreshTokenExpiracy: Date;
};

export type GrantReturn = {
  data: TokenInfo | null;
  errors: RequestBodyErrorType[];
};

export type LogoutReturn = {
  sucess: boolean;
  errors: RequestBodyErrorType[];
};
