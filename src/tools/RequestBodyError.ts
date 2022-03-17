/* eslint-disable no-underscore-dangle */
type RequestBodyErrorType = {
  code: string;
  msg: string;
};

export default class RequestBodyError {
  private _code: string;

  private _msg: string;

  constructor(error: RequestBodyErrorType) {
    this._code = error.code;
    this._msg = error.msg;
  }

  get code() {
    return this._code;
  }

  get msg() {
    return this._msg;
  }
}
