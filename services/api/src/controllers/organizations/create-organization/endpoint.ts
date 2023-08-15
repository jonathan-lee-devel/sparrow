import {z} from 'zod';
import {Request, Response} from 'express';
import {EndpointCallback, ReturnBasedOnAuthenticationAndSafeParseResultFunction} from '../../../lib/endpoint-util';

export const makeEndpoint = <TBody, TQuery> (
  returnBasedOnAuthenticationAndSafeParseResult: ReturnBasedOnAuthenticationAndSafeParseResultFunction<TBody, TQuery>,
  bodySchema: z.Schema<TBody>,
  querySchema: z.Schema<TQuery>,
  callback: EndpointCallback<TBody, TQuery>,
) => (req: Request, res: Response) => {
    returnBasedOnAuthenticationAndSafeParseResult(
        false,
        bodySchema.safeParse(req.body),
        querySchema.safeParse(req.query),
        callback,
        req,
        res,
    );
  };
