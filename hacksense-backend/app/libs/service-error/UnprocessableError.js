function UnprocessableError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee.caller);

  this.message = message;
  this.name = 'UnprocessableError';
  this.httpStatus = 422;
}

UnprocessableError.prototype.__proto__ = Error.prototype;

module.exports = UnprocessableError;
