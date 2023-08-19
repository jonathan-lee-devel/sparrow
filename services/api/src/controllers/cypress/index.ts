import {makeMakeCypressHealthCheckEndpoint} from './endpoints/cypress-health-check';
import {returnAnonymouslyBasedOnSafeParseResult} from '../../lib/endpoint-util';
import logger from '../../logger';
import {CypressHealthCheckRequestBodySchema, CypressHealthCheckRequestQuerySchema} from './schemas/cypress-health-check';
import {makeCypressHealthCheckCallback} from './callbacks/cypress-health-check';

export const cypressHealthCheckHandler = makeMakeCypressHealthCheckEndpoint(returnAnonymouslyBasedOnSafeParseResult)(
    CypressHealthCheckRequestBodySchema,
    CypressHealthCheckRequestQuerySchema,
    makeCypressHealthCheckCallback(logger),
);
