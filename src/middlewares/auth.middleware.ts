import { TOKEN_SECRET } from '@config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).send();
    return;
  }

  jwt.verify(token, TOKEN_SECRET as string, (err: any, payload: any) => {
    if (err) {
      res.status(403).send();
      return;
    }

    // Pass users' role from JWT to the actual end point
    req.role = payload.role;

    next();
  });
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    authenticateToken(req, res, next);
  } catch (err) {
    next(err);
  }
};
