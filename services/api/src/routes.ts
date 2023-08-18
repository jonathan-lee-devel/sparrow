import {Router} from 'express';
import * as LogoutController from './controllers/auth/logout';
import * as ProductController from './controllers/products';
import {createOrganizationHandler, getOrganizationSnippetHandler, searchOrganizationsHandler} from './controllers/organizations';
import {loginHandler} from './controllers/auth';

const router = Router();

// Auth Routes
// router.post('/auth/login', LoginController.post);
router.post('/auth/login', loginHandler);
router.post('/auth/logout', LogoutController.post);

// Product Routes
router.get('/products/:productId', ProductController.get);

// Organization Routes
router.get('/organizations/:organizationId/snippet', getOrganizationSnippetHandler);
router.get('/organizations/search/:searchString', searchOrganizationsHandler);
router.post('/organizations', createOrganizationHandler);

export default router;
