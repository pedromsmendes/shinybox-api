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

variableErrors.throw();

export const NODE_ENV = process.env.NODE_ENV!;
export const IN_DEV = NODE_ENV === 'development';
export const IN_TEST = NODE_ENV === 'test';
export const IN_PROD = NODE_ENV === 'production';
export const API_PORT = parsedApiPort;
