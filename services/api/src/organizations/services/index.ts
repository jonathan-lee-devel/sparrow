import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {makeCreateOrganization} from './create-organization.js';
import {generatedId} from '../../util/id/services/index.js';
import {OrganizationModel} from '../models/Organization.js';
import {makeGetOrganization} from './get-organization.js';
import {makeRequestToJoinOrganization} from './request-to-join-organization.js';
import {OrganizationMembershipRequestModel} from '../models/OrganizationMembershipRequest.js';
import {makeGetRequestsToJoinOrganization} from './get-requests-to-join-organization.js';
import {makeRemoveOrganizationMember} from './remove-organization-member.js';
import {makeApproveRequestToJoinOrganization} from './approve-request-to-join-organization.js';
import {makeRemoveOrganizationAdministrator} from './remove-organization-administrator.js';
import {makeGetOrganizationsWhereInvolved} from './get-organizations-where-involved.js';
import {makeGetOrganizationSnippet} from './get-organization-snippet.js';
import {makeInviteToJoinOrganization} from './invite-to-join-organization.js';
import {OrganizationInvitationModel} from '../models/OrganizationInvitation.js';
import {sendMail} from '../../util/email/exports/index.js';
import {makeGetOrganizationInvitationByTokenValue} from './get-organization-invitation-by-token-value.js';
import {makeUpdateAdministratorJoinAsMember} from './update-administrator-join-as-member.js';
import {makeSearchOrganizations} from './search-organizations.js';
import {makeDeleteOrganization} from './delete-organization.js';

const logger = loggerConfig();

export const getOrganization = makeGetOrganization(
    logger,
    OrganizationModel,
);

export const getOrganizationSnippet = makeGetOrganizationSnippet(
    logger,
    OrganizationModel,
);

export const getOrganizationsWhereInvolved = makeGetOrganizationsWhereInvolved(
    logger,
    OrganizationModel,
);

export const createOrganization = makeCreateOrganization(
    logger,
    generatedId,
    OrganizationModel,
);

export const removeOrganizationAdministrator = makeRemoveOrganizationAdministrator(
    logger,
    OrganizationModel,
);

export const removeOrganizationMember = makeRemoveOrganizationMember(
    logger,
    OrganizationModel,
);

export const getRequestsToJoinOrganization = makeGetRequestsToJoinOrganization(
    logger,
    OrganizationModel,
    OrganizationMembershipRequestModel,
);

export const requestToJoinOrganization = makeRequestToJoinOrganization(
    logger,
    OrganizationModel,
    OrganizationMembershipRequestModel,
    generatedId,
);

export const approveRequestToJoinOrganization = makeApproveRequestToJoinOrganization(
    logger,
    OrganizationMembershipRequestModel,
    OrganizationModel,
);

export const inviteToJoinOrganization = makeInviteToJoinOrganization(
    logger,
    OrganizationModel,
    OrganizationInvitationModel,
    generatedId,
    sendMail,
);

export const getOrganizationInvitationByTokenValue = makeGetOrganizationInvitationByTokenValue(
    logger,
    OrganizationInvitationModel,
);

export const updateAdministratorJoinAsMember = makeUpdateAdministratorJoinAsMember(
    logger,
    OrganizationModel,
);

export const searchOrganizations = makeSearchOrganizations(
    logger,
    OrganizationModel,
);

export const deleteOrganization = makeDeleteOrganization(
    logger,
    OrganizationModel,
);
