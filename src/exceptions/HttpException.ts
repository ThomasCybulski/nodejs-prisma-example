import { logger } from '@utils/logger';

class HttpException extends Error {
  status: number;

  message: string;

  constructor(status: number, message: any) {
    super(message);
    this.status = status;
    this.message = message;
    logger.error(`HttpException ${status}, Message: ${JSON.stringify(message)}`);
  }
}

export default HttpException;
