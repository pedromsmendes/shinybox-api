export type RequestBodyErrorType = {
  code: string;
  msg: string;
};

/* eslint-disable no-underscore-dangle */
export default class RequestBodyError {
  private _errors: RequestBodyErrorType[] = [];

  constructor(errors?: RequestBodyErrorType[]) {
    this._errors.push(...(errors || []));
  }

  push(error: RequestBodyErrorType) {
    this._errors.push(error);
  }

  throw() {
    if (this._errors.length) {
      throw new RequestBodyError(this._errors);
    }
  }

  get errors() {
    return this._errors;
  }
}
