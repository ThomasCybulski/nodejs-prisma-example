import { NextFunction, Request, Response } from 'express';
import HttpException from '@exceptions/HttpException';

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};
