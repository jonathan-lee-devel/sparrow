import {AuthenticatedEndpointCallback, ReturnBasedOnAuthenticationAndSafeParseResultFunction} from '../../../lib/endpoint-util';
import {z} from 'zod';
import {Request, Response} from 'express';

export const makeMakeCreateOrganizationEndpoint = <TBody, TQuery>(
  returnBasedOnAuthenticationAndSafeParseResult: ReturnBasedOnAuthenticationAndSafeParseResultFunction<TBody, TQuery>,
) => {
  return function(
      bodySchema: z.Schema<TBody>,
      querySchema: z.Schema<TQuery>,
      callback: AuthenticatedEndpointCallback<TBody, TQuery>,
  ) {
    return (req: Request, res: Response) => {
      returnBasedOnAuthenticationAndSafeParseResult(
          bodySchema.safeParse(req.body),
          querySchema.safeParse(req.query),
          callback,
          req,
          res,
      );
    };
  };
};
