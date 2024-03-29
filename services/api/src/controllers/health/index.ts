import {makeMakeIndexHealthCheckEndpoint} from './endpoints/index-health-check';
import {returnAnonymouslyBasedOnSafeParseResult} from '../../lib/endpoint-util';
import logger from '../../logger';
import {IndexHealthCheckRequestBodySchema, IndexHealthCheckRequestQuerySchema} from './schemas/index-health-check';
import {makeIndexHealthCheckCallback} from './callbacks/index-health-check';

export const indexHealthCheckHandler = makeMakeIndexHealthCheckEndpoint(returnAnonymouslyBasedOnSafeParseResult)(
    IndexHealthCheckRequestBodySchema,
    IndexHealthCheckRequestQuerySchema,
    makeIndexHealthCheckCallback(logger),
);
