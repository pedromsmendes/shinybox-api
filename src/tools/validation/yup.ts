import { ApolloError } from 'apollo-server-core';
import { type ObjectSchema, ValidationError } from 'yup';

import { Code, type GraphqlError } from '@/graphql/Globals/Globals.types';

const formatErrors = (exception: ValidationError) => {
  const errors: GraphqlError[] = [];

  if (!exception.inner) {
    return errors;
  }

  if (exception.inner.length === 0) {
    errors.push({
      field: exception.path || '*',
      message: exception.message || '',
      code: Code.BAD_USER_INPUT,
    });

    return errors;
  }

  (exception.inner || []).forEach((err) => {
    (err.errors || []).forEach((errMsg) => {
      errors.push({
        field: err.path || '*',
        message: errMsg,
        code: Code.WRONG_BINO,
      });
    });
  });

  return errors;
};

const validateYup = async (schema: ObjectSchema<any>, data: any) => {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (ex) {
    if (ex instanceof ValidationError) {
      const errors = formatErrors(ex);

      throw new ApolloError(
        'Validation failed',
        'VALIDATION_FAILED',
        { validationErrors: errors },
      );
    }
  }
};

export default validateYup;
