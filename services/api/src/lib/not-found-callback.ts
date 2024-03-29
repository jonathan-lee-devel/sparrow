import createError from 'http-errors';
import {NextFunction, Request, Response} from 'express';

export const notFoundCallback = (_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404));
};
