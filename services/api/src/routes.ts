import { Router } from 'express';

import * as ProductController from './controllers/products';

const router = Router();

// Product Routes
router.get('/products/:productId', ProductController.get);

export default router;
