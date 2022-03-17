import VariableError from '@/tools/VariableError';

const variableErrors = new VariableError();

if (!process.env.NODE_ENV) {
  variableErrors.pushMissingVariable('NODE_ENV');
}

let parsedApiPort = 0;
if (!process.env.API_PORT) {
  variableErrors.pushMissingVariable('API_PORT');
} else {
  parsedApiPort = parseInt(process.env.API_PORT, 10);

  if (Number.isNaN(parsedApiPort)) {
    variableErrors.pushWrongType('API_PORT');
  }
}

if (!process.env.GQL_PATH) {
  variableErrors.pushMissingVariable('GQL_PATH');
}

variableErrors.throw();

export const NODE_ENV = process.env.NODE_ENV!;
export const IN_DEV = NODE_ENV === 'development';
export const IN_TEST = NODE_ENV === 'test';
export const IN_PROD = NODE_ENV === 'production';

/* SERVER */
export const API_PORT = parsedApiPort;

/* APOLLO */
export const GQL_PATH = process.env.GQL_PATH;

/* AUTH */
export const GRANT_AUTH_PATH = '/auth/grant';
export const LOGOUT_AUTH_PATH = '/auth/logout';

/* DEV/TEST GLOBALS */
export const API_CLIENT_FRONTEND_ID = 'frontend';
export const API_CLIENT_FRONTEND_SECRET = 'd9a5666d-c08e-41b8-b5f1-b56cb8a96f9e';
export const API_CLIENT_MOBILE_ID = 'mobile';
export const API_CLIENT_MOBILE_SECRET = '2df0064e-013c-4dd1-b611-8c7604b4aaf3';
