import {returnBasedOnAuthenticationAndSafeParseResult} from '../../lib/endpoint-util';
import logger from '../../logger';
import {makeCreateOrganizationCallback} from './callbacks/create-organization';
import {makeMakeCreateOrganizationEndpoint} from './endpoints/create-organization';
import {CreateOrganizationRequestBodySchema, CreateOrganizationRequestQuerySchema} from './schemas/create-organization';

export const createOrganizationHandler = makeMakeCreateOrganizationEndpoint(returnBasedOnAuthenticationAndSafeParseResult)(
    CreateOrganizationRequestBodySchema,
    CreateOrganizationRequestQuerySchema,
    makeCreateOrganizationCallback(logger),
);
