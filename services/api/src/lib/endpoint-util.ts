import {AuthenticatedRequest, Request, Response} from 'express';
import {SafeParseError, SafeParseSuccess} from 'zod';
import {HttpStatus} from './enums/HttpStatus';

const returnBasedOnSafeParseResult = <TBody, TQuery>(
  bodyParseResult: SafeParseSuccess<TBody> | SafeParseError<TBody>,
  queryParseResult: SafeParseSuccess<TQuery> | SafeParseError<TQuery>,
  callback: AuthenticatedEndpointCallback<TBody, TQuery>,
  req: Request,
  res: Response,
) => {
  if (!bodyParseResult.success) {
    return res.status(HttpStatus.BAD_REQUEST).json(bodyParseResult.error);
  } else if (!queryParseResult.success) {
    return res.status(HttpStatus.BAD_REQUEST).json(queryParseResult.error);
  }
  return callback(req as any, res);
};

export type AnonymousEndpointCallback<TBody, TQuery> = (req: Request<any, any, TBody, TQuery>, res: Response) => void;

export type ReturnAnonymouslyBasedOnSafeParseResultFunction<TBody, TQuery> = (
  bodyParseResult: SafeParseSuccess<TBody> | SafeParseError<TBody>,
  queryParseResult: SafeParseSuccess<TQuery> | SafeParseError<TQuery>,
  callback: AuthenticatedEndpointCallback<TBody, TQuery>,
  req: Request,
  res: Response,
) => void;

export const returnAnonymouslyBasedOnSafeParseResult = <TBody, TQuery>(
  bodyParseResult: SafeParseSuccess<TBody> | SafeParseError<TBody>,
  queryParseResult: SafeParseSuccess<TQuery> | SafeParseError<TQuery>,
  callback: AuthenticatedEndpointCallback<TBody, TQuery>,
  req: Request,
  res: Response,
) => {
  return returnBasedOnSafeParseResult(bodyParseResult, queryParseResult, callback, req, res);
};

export type AuthenticatedEndpointCallback<TBody, TQuery> = (req: AuthenticatedRequest<any, any, TBody, TQuery>, res: Response) => void;

export type ReturnBasedOnAuthenticationAndSafeParseResultFunction<TBody, TQuery> = (
  bodyParseResult: SafeParseSuccess<TBody> | SafeParseError<TBody>,
  queryParseResult: SafeParseSuccess<TQuery> | SafeParseError<TQuery>,
  callback: AuthenticatedEndpointCallback<TBody, TQuery>,
  req: Request,
  res: Response,
) => void;

export const returnBasedOnAuthenticationAndSafeParseResult = <TBody, TQuery>(
  bodyParseResult: SafeParseSuccess<TBody> | SafeParseError<TBody>,
  queryParseResult: SafeParseSuccess<TQuery> | SafeParseError<TQuery>,
  callback: AuthenticatedEndpointCallback<TBody, TQuery>,
  req: Request,
  res: Response,
) => {
  return (req.user) ?
    returnBasedOnSafeParseResult(bodyParseResult, queryParseResult, callback, req, res) :
    res.status(HttpStatus.UNAUTHORIZED).send();
};
