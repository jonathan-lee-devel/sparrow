import {makeCreateOrganizationController} from './create-organization.js';
import {
  approveRequestToJoinOrganization,
  createOrganization,
  getOrganization,
  getOrganizationInvitationByTokenValue,
  getOrganizationSnippet,
  getOrganizationsWhereInvolved,
  getRequestsToJoinOrganization,
  inviteToJoinOrganization,
  removeOrganizationAdministrator,
  removeOrganizationMember,
  requestToJoinOrganization,
  updateAdministratorJoinAsMember,
} from '../services/index.js';
import {makeGetOrganizationController} from './get-organization.js';
import {makeRequestToJoinOrganizationController} from './request-to-join-organization.js';
import {makeGetRequestsToJoinOrganizationController} from './get-requests-to-join-organization.js';
import {makeRemoveOrganizationMemberController} from './remove-organization-member.js';
import {makeApproveRequestToJoinOrganizationController} from './approve-request-to-join-organization.js';
import {makeRemoveOrganizationAdministratorController} from './remove-organization-administrator.js';
import {makeGetOrganizationsWhereInvolvedController} from './get-organizations-where-involved.js';
import {makeGetOrganizationSnippetController} from './get-organization-snippet.js';
import {makeInviteToJoinOrganizationController} from './invite-to-join-organization.js';
import {makeGetOrganizationInvitationByTokenValueController} from './get-organization-invitation-by-token-value.js';
import {makeUpdateAdministratorJoinAsMemberController} from './update-administrator-join-as-member.js';

export const createOrganizationController = makeCreateOrganizationController(createOrganization);

export const getOrganizationController = makeGetOrganizationController(getOrganization);

export const getOrganizationSnippetController = makeGetOrganizationSnippetController(getOrganizationSnippet);

export const getOrganizationsWhereInvolvedController =
    makeGetOrganizationsWhereInvolvedController(getOrganizationsWhereInvolved);

export const removeOrganizationAdministratorController =
    makeRemoveOrganizationAdministratorController(removeOrganizationAdministrator);

export const removeOrganizationMemberController = makeRemoveOrganizationMemberController(removeOrganizationMember);

export const getRequestsToJoinOrganizationController =
    makeGetRequestsToJoinOrganizationController(getRequestsToJoinOrganization);

export const requestToJoinOrganizationController = makeRequestToJoinOrganizationController(requestToJoinOrganization);

export const approveRequestToJoinOrganizationController =
    makeApproveRequestToJoinOrganizationController(approveRequestToJoinOrganization);

export const inviteToJoinOrganizationController =
    makeInviteToJoinOrganizationController(inviteToJoinOrganization);

export const getOrganizationInvitationByTokenValueController =
    makeGetOrganizationInvitationByTokenValueController(getOrganizationInvitationByTokenValue);

export const updateAdministratorJoinAsMemberController =
    makeUpdateAdministratorJoinAsMemberController(updateAdministratorJoinAsMember);
