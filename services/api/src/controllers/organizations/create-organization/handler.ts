import {HttpStatus} from '../../../lib/enums/HttpStatus';
import {makeEndpoint} from './endpoint';
import {CreateOrganizationRequestBodySchema, CreateOrganizationRequestQuerySchema} from './schemas';
import {returnBasedOnAuthenticationAndSafeParseResult} from '../../../lib/endpoint-util';

export const createOrganizationHandler = makeEndpoint(
    returnBasedOnAuthenticationAndSafeParseResult,
    CreateOrganizationRequestBodySchema,
    CreateOrganizationRequestQuerySchema,
    (req, res)=> {
      const {name} = req.body;
      res.status(HttpStatus.OK).json({name});
    },
);
