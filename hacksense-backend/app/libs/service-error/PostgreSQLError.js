const BaseError = require('./BaseError');

class PostgreSQLError extends BaseError {
  constructor(originalError) {
    super(500, originalError);

    this.name = this.constructor.name;

    switch (originalError.errno) {
      case 23505:
        this.httpStatus = 400;
        this.message = 'unique key violation';
        break;
      case 23503:
        this.httpStatus = 400;
        this.message = 'foreign key violation';
        break;
      case undefined:
        throw originalError;
      default:
        this.message = 'unhandled postgres error';
    }

    this.details = originalError.sqlMessage;
  }
}

module.exports = PostgreSQLError;
