import {returnAnonymouslyBasedOnSafeParseResult, returnBasedOnAuthenticationAndSafeParseResult} from '../../lib/endpoint-util';
import logger from '../../logger';
import {makeCreateOrganizationCallback} from './callbacks/create-organization';
import {makeMakeCreateOrganizationEndpoint} from './endpoints/create-organization';
import {CreateOrganizationRequestBodySchema, CreateOrganizationRequestQuerySchema} from './schemas/create-organization';
import {generateId} from '../../lib/generate-id';
import {makeMakeGetOrganizationSnippetEndpoint} from './endpoints/get-organization-snippet';
import {GetOrganizationSnippetRequestBodySchema, GetOrganizationSnippetRequestQuerySchema} from './schemas/get-organization-snippet';
import {makeGetOrganizationSnippetCallback} from './callbacks/get-organization-snippet';
import {makeMakeSearchOrganizationEndpoint} from './endpoints/search-organizations';
import {SearchOrganizationsRequestBodySchema, SearchOrganizationsRequestQuerySchema} from './schemas/search-organizations';
import {makeSearchOrganizationsCallback} from './callbacks/search-organizations';
import {OrganizationModel} from '../../models/organizations/Organization';
import {defaultModelTransform} from '../../lib/model-transform/default-model-transform';
import {organizationSnippetModelTransform} from '../../lib/model-transform/organization-snippet-model-transform';
import {makeMakeGetOrganizationsWhereInvolvedEndpoint} from './endpoints/get-organizations-where-involved';
import {
  GetOrganizationsWhereInvolvedRequestBodySchema,
  GetOrganizationsWhereInvolvedRequestQuerySchema,
} from './schemas/get-organizations-where-involved';
import {makeGetOrganizationsWhereInvolvedCallback} from './callbacks/get-organizations-where-involved';
import {makeMakeGetOrganizationEndpoint} from './endpoints/get-organization';
import {GetOrganizationRequestBodySchema, GetOrganizationRequestQuerySchema} from './schemas/get-organization';
import {makeGetOrganizationCallback} from './callbacks/get-organization';
import {makeMakeDeleteOrganizationEndpoint} from './endpoints/delete-organization';
import {DeleteOrganizationRequestBodySchema, DeleteOrganizationRequestQuerySchema} from './schemas/delete-organization';
import {makeDeleteOrganizationCallback} from './callbacks/delete-organization';
import {makeMakeRemoveOrganizationAdministratorEndpoint} from './endpoints/remove-organization-administrator';
import {
  RemoveOrganizationAdministratorRequestBodySchema,
  RemoveOrganizationAdministratorRequestQuerySchema,
} from './schemas/remove-organization-administrator';
import {makeRemoveOrganizationAdministratorCallback} from './callbacks/remove-organization-administrator';

export const getOrganizationHandler = makeMakeGetOrganizationEndpoint(returnBasedOnAuthenticationAndSafeParseResult)(
    GetOrganizationRequestBodySchema,
    GetOrganizationRequestQuerySchema,
    makeGetOrganizationCallback(logger, OrganizationModel, defaultModelTransform),
);

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

export const getOrganizationsWhereInvolvedHandler = makeMakeGetOrganizationsWhereInvolvedEndpoint(
    returnBasedOnAuthenticationAndSafeParseResult)(
    GetOrganizationsWhereInvolvedRequestBodySchema,
    GetOrganizationsWhereInvolvedRequestQuerySchema,
    makeGetOrganizationsWhereInvolvedCallback(logger, OrganizationModel, defaultModelTransform),
);

export const deleteOrganizationHandler = makeMakeDeleteOrganizationEndpoint(
    returnBasedOnAuthenticationAndSafeParseResult)(
    DeleteOrganizationRequestBodySchema,
    DeleteOrganizationRequestQuerySchema,
    makeDeleteOrganizationCallback(logger, OrganizationModel, defaultModelTransform),
);

export const removeOrganizationAdministratorHandler = makeMakeRemoveOrganizationAdministratorEndpoint(
    returnBasedOnAuthenticationAndSafeParseResult)(
    RemoveOrganizationAdministratorRequestBodySchema,
    RemoveOrganizationAdministratorRequestQuerySchema,
    makeRemoveOrganizationAdministratorCallback(logger, OrganizationModel, defaultModelTransform),
);
