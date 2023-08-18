import {returnAnonymouslyBasedOnSafeParseResult, returnBasedOnAuthenticationAndSafeParseResult} from '../../lib/endpoint-util';
import logger from '../../logger';
import {makeCreateOrganizationCallback} from './callbacks/create-organization';
import {makeMakeCreateOrganizationEndpoint} from './endpoints/create-organization';
import {CreateOrganizationRequestBodySchema, CreateOrganizationRequestQuerySchema} from './schemas/create-organization';
import {generateId} from '../../lib/generate-id';
import {defaultModelTransform, organizationSnippetModelTransform} from '../../lib/model-transform';
import {makeMakeGetOrganizationSnippetEndpoint} from './endpoints/get-organization-snippet';
import {GetOrganizationSnippetRequestBodySchema, GetOrganizationSnippetRequestQuerySchema} from './schemas/get-organization-snippet';
import {makeGetOrganizationSnippetCallback} from './callbacks/get-organization-snippet';
import {makeMakeSearchOrganizationEndpoint} from './endpoints/search-organizations';
import {SearchOrganizationsRequestBodySchema, SearchOrganizationsRequestQuerySchema} from './schemas/search-organizations';
import {makeSearchOrganizationsCallback} from './callbacks/search-organizations';
import {OrganizationModel} from '../../models/organizations/Organization';

export const getOrganizationSnippetHandler = makeMakeGetOrganizationSnippetEndpoint(returnAnonymouslyBasedOnSafeParseResult)(
    GetOrganizationSnippetRequestBodySchema,
    GetOrganizationSnippetRequestQuerySchema,
    makeGetOrganizationSnippetCallback(logger, OrganizationModel, defaultModelTransform),
);

export const createOrganizationHandler = makeMakeCreateOrganizationEndpoint(returnBasedOnAuthenticationAndSafeParseResult)(
    CreateOrganizationRequestBodySchema,
    CreateOrganizationRequestQuerySchema,
    makeCreateOrganizationCallback(logger, OrganizationModel, generateId, defaultModelTransform),
);

export const searchOrganizationsHandler = makeMakeSearchOrganizationEndpoint(returnAnonymouslyBasedOnSafeParseResult)(
    SearchOrganizationsRequestBodySchema,
    SearchOrganizationsRequestQuerySchema,
    makeSearchOrganizationsCallback(logger, OrganizationModel, organizationSnippetModelTransform),
);
