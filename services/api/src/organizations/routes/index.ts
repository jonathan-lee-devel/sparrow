import express from 'express';
import {configureRoute} from '../../main/routes/configure-route.js';
import {HttpRequestMethod} from '../../main/enums/http-request-method.js';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback.js';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {
  approveRequestToJoinOrganizationController,
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationController,
  getOrganizationInvitationByTokenValueController,
  getOrganizationSnippetController,
  getOrganizationsWhereInvolvedController,
  getRequestsToJoinOrganizationController,
  inviteToJoinOrganizationController,
  removeOrganizationAdministratorController,
  removeOrganizationMemberController,
  requestToJoinOrganizationController,
  searchOrganizationsController,
  updateAdministratorJoinAsMemberController,
} from '../controllers/index.js';
import {createOrganizationValidationChain} from '../validation-chains/create-organization.js';
import {removeOrganizationMemberValidationChain} from '../validation-chains/remove-organization-member.js';
import {
  removeOrganizationAdministratorValidationChain,
} from '../validation-chains/remove-organization-administrator.js';
import {inviteToJoinOrganizationValidationChain} from '../validation-chains/invite-to-join-organization.js';
import {
  updateAdministratorJoinAsMemberValidationChain,
} from '../validation-chains/update-administrator-join-as-member.js';

const router = express.Router();

const logger = loggerConfig();

configureRoute(router, HttpRequestMethod.POST, '/', true, createOrganizationValidationChain, makeExpressCallback(logger, createOrganizationController));

configureRoute(router, HttpRequestMethod.GET, '/where-involved', true, [], makeExpressCallback(logger, getOrganizationsWhereInvolvedController));

configureRoute(router, HttpRequestMethod.GET, '/:organizationId', true, [], makeExpressCallback(logger, getOrganizationController));

configureRoute(router, HttpRequestMethod.GET, '/:organizationId/snippet', false, [], makeExpressCallback(logger, getOrganizationSnippetController));

configureRoute(router, HttpRequestMethod.PATCH, '/:organizationId/administrators/remove', true, removeOrganizationAdministratorValidationChain, makeExpressCallback(logger, removeOrganizationAdministratorController));

configureRoute(router, HttpRequestMethod.PATCH, '/:organizationId/members/remove', true, removeOrganizationMemberValidationChain, makeExpressCallback(logger, removeOrganizationMemberController));

configureRoute(router, HttpRequestMethod.GET, '/requests-to-join/:organizationId', true, [], makeExpressCallback(logger, getRequestsToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.POST, '/request-to-join/:organizationId', true, [], makeExpressCallback(logger, requestToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.PUT, '/request-to-join/approve/:requestToJoinOrganizationId', true, [], makeExpressCallback(logger, approveRequestToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.POST, '/invite-to-join/:organizationId', true, inviteToJoinOrganizationValidationChain, makeExpressCallback(logger, inviteToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.GET, '/invitations/tokenValue/:organizationInvitationTokenValue', true, [], makeExpressCallback(logger, getOrganizationInvitationByTokenValueController));

configureRoute(router, HttpRequestMethod.PATCH, '/update-admin-join-as-member/:toJoinOrganizationId', true, updateAdministratorJoinAsMemberValidationChain, makeExpressCallback(logger, updateAdministratorJoinAsMemberController));

configureRoute(router, HttpRequestMethod.GET, '/search/:searchString', false, [], makeExpressCallback(logger, searchOrganizationsController));

configureRoute(router, HttpRequestMethod.DELETE, '/:organizationId', true, [], makeExpressCallback(logger, deleteOrganizationController));

export {router as OrganizationsRouter};
