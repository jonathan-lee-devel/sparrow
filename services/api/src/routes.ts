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
import {confirmRegistrationHandler, registerUserHandler} from './controllers/registration';
import {confirmPasswordResetHandler, resetPasswordHandler} from './controllers/password';
import {createProductHandler} from './controllers/products';

const router = Router();

// Cypress Routes
router.get('/', cypressHealthCheckHandler);

// Auth Routes
router.post('/auth/login', loginHandler);
router.post('/auth/logout', logoutHandler);

// User Routes
router.get('/profile', getProfileHandler);

// Registration Routes
router.post('/register', registerUserHandler);
router.post('/register/confirm', confirmRegistrationHandler);

// Password Routes
router.post('/password/reset', resetPasswordHandler);
router.post('/password/reset/confirm', confirmPasswordResetHandler);

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

// Product Routes
router.post('/products', createProductHandler);

export default router;
