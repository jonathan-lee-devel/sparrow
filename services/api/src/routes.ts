import { Router } from 'express';

import * as LoginController from './controllers/auth/login';
import * as LogoutController from './controllers/auth/logout';
import * as ProductController from './controllers/products';

const router = Router();

// Auth Routes
router.post('/auth/login', LoginController.post);
router.post('/auth/logout', LogoutController.post);

// Product Routes
router.get('/products/:productId', ProductController.get);

export default router;
