import {EndpointCallback, ReturnBasedOnAuthenticationAndSafeParseResultFunction} from '../../../lib/endpoint-util';
import {z} from 'zod';
import {Request, Response} from 'express';

export const makeMakeCreateOrganizationEndpoint = <TBody, TQuery>(
  returnBasedOnAuthenticationAndSafeParseResult: ReturnBasedOnAuthenticationAndSafeParseResultFunction<TBody, TQuery>,
) => {
  return function(
      bodySchema: z.Schema<TBody>,
      querySchema: z.Schema<TQuery>,
      callback: EndpointCallback<TBody, TQuery>,
  ) {
    return (req: Request, res: Response) => {
      returnBasedOnAuthenticationAndSafeParseResult(
          false,
          bodySchema.safeParse(req.body),
          querySchema.safeParse(req.query),
          callback,
          req,
          res,
      );
    };
  };
};
