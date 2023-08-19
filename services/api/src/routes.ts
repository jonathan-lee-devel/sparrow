import {Router} from 'express';
import * as ProductController from './controllers/products';
import {
  createOrganizationHandler,
  getOrganizationHandler,
  getOrganizationSnippetHandler,
  getOrganizationsWhereInvolvedHandler,
  searchOrganizationsHandler,
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

// Product Routes
router.get('/products/:productId', ProductController.get);

// Organization Routes
router.get('/organizations/:organizationId', getOrganizationHandler);
router.get('/organizations/:organizationId/snippet', getOrganizationSnippetHandler);
router.get('/organizations/search/:searchString', searchOrganizationsHandler);
router.post('/organizations', createOrganizationHandler);
router.get('/organizations/where-involved', getOrganizationsWhereInvolvedHandler);

export default router;
