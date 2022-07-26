import HttpException from '@exceptions/HttpException';

class InvalidSchemaException extends HttpException {
  constructor() {
    super(400, 'invalid property schema');
  }
}

export default InvalidSchemaException;
