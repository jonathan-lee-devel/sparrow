import {Request, Response} from 'express';
import {SafeParseError, SafeParseSuccess} from 'zod';
import {HttpStatus} from './enums/HttpStatus';

export type EndpointCallback<TBody, TQuery> = (req: Request<any, any, TBody, TQuery>, res: Response) => void;

export type ReturnBasedOnAuthenticationAndSafeParseResultFunction<TBody, TQuery> = (
  requiresAuthentication: boolean,
  bodyParseResult: SafeParseSuccess<TBody> | SafeParseError<TBody>,
  queryParseResult: SafeParseSuccess<TQuery> | SafeParseError<TQuery>,
  callback: EndpointCallback<TBody, TQuery>,
  req: Request,
  res: Response,
) => void;

export const returnBasedOnAuthenticationAndSafeParseResult = <TBody, TQuery>(
  requiresAuthentication: boolean,
  bodyParseResult: SafeParseSuccess<TBody> | SafeParseError<TBody>,
  queryParseResult: SafeParseSuccess<TQuery> | SafeParseError<TQuery>,
  callback: EndpointCallback<TBody, TQuery>,
  req: Request,
  res: Response,
) => {
  if (requiresAuthentication && !req.user) {
    return res.status(HttpStatus.UNAUTHORIZED).send();
  }
  if (!bodyParseResult.success) {
    return res.status(HttpStatus.BAD_REQUEST).json(bodyParseResult.error);
  } else if (!queryParseResult.success) {
    return res.status(HttpStatus.BAD_REQUEST).json(queryParseResult.error);
  }
  return callback(req as any, res);
};
