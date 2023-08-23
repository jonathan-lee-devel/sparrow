import {Router} from 'express';
import {
  createOrganizationHandler,
  deleteOrganizationHandler,
  getOrganizationHandler,
  getOrganizationSnippetHandler,
  getOrganizationsWhereInvolvedHandler,
  removeOrganizationAdministratorHandler,
  removeOrganizationMemberHandler,
  searchOrganizationsHandler,
  updateOrganizationAdministratorJoinAsMemberHandler,
} from './controllers/organizations';
import {loginHandler, logoutHandler} from './controllers/auth';
import {cypressHealthCheckHandler} from './controllers/cypress';
import {getProfileHandler} from './controllers/profile';

const router = Router();

// Cypress Routes
router.get('/', cypressHealthCheckHandler);

// Auth Routes
router.post('/auth/login', loginHandler);
router.post('/auth/logout', logoutHandler);

// User Routes
router.get('/profile', getProfileHandler);

// Organization Routes
router.get('/organizations/:organizationId', getOrganizationHandler);
router.get('/organizations/:organizationId/snippet', getOrganizationSnippetHandler);
router.get('/organizations/search/:searchString', searchOrganizationsHandler);
router.post('/organizations', createOrganizationHandler);
router.get('/organizations/get/where-involved', getOrganizationsWhereInvolvedHandler);
router.delete('/organizations/:organizationId', deleteOrganizationHandler);
router.patch('/organizations/:organizationId/administrators/remove', removeOrganizationAdministratorHandler);
router.patch('/organizations/:organizationId/members/remove', removeOrganizationMemberHandler);
router.patch('/organizations/update-admin-join-as-member/:organizationId', updateOrganizationAdministratorJoinAsMemberHandler);

export default router;
