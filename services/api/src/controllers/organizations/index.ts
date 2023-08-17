import {returnAnonymouslyBasedOnSafeParseResult, returnBasedOnAuthenticationAndSafeParseResult} from '../../lib/endpoint-util';
import logger from '../../logger';
import {makeCreateOrganizationCallback} from './callbacks/create-organization';
import {makeMakeCreateOrganizationEndpoint} from './endpoints/create-organization';
import {CreateOrganizationRequestBodySchema, CreateOrganizationRequestQuerySchema} from './schemas/create-organization';
import Organization from '../../models/organizations/Organization';
import {generateId} from '../../lib/generate-id';
import {modelTransform} from '../../lib/model-transform';
import {makeMakeGetOrganizationSnippetEndpoint} from './endpoints/get-organization-snippet';
import {GetOrganizationSnippetRequestBodySchema, GetOrganizationSnippetRequestQuerySchema} from './schemas/get-organization-snippet';
import {makeGetOrganizationSnippetCallback} from './callbacks/get-organization-snippet';

export const getOrganizationSnippetHandler = makeMakeGetOrganizationSnippetEndpoint(returnAnonymouslyBasedOnSafeParseResult)(
    GetOrganizationSnippetRequestBodySchema,
    GetOrganizationSnippetRequestQuerySchema,
    makeGetOrganizationSnippetCallback(logger, Organization, modelTransform),
);

export const createOrganizationHandler = makeMakeCreateOrganizationEndpoint(returnBasedOnAuthenticationAndSafeParseResult)(
    CreateOrganizationRequestBodySchema,
    CreateOrganizationRequestQuerySchema,
    makeCreateOrganizationCallback(logger, Organization, generateId, modelTransform),
);
