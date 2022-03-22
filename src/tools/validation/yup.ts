import { ApolloError } from 'apollo-server-core';
import { type ObjectSchema, ValidationError } from 'yup';

type Error = {
  field: string;
  msg: string;
};

const formatErrors = (exception: ValidationError) => {
  if (!exception.inner) {
    return [];
  }

  if (exception.inner.length === 0) {
    return [{
      field: exception.path || '*',
      msg: exception.message || '',
    }];
  }

  const errors: Error[] = [];

  (exception.inner || []).forEach((err) => {
    (err.errors || []).forEach((errMsg) => {
      errors.push({
        field: err.path || '*',
        msg: errMsg,
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
      const errors: Error[] = [...formatErrors(ex)];

      throw new ApolloError(
        'Validation failed',
        'VALIDATION_FAILED',
        { validationErrors: errors },
      );
    }
  }
};

export default validateYup;
