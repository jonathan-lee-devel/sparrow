import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

import * as ProductController from './controllers/products';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const router = Router();

// Product Routes
router.get('/products/:productId', ProductController.get);

const SWAGGER_YAML_FILEPATH = path.join(__dirname, '../openapi.yml');

// Dev routes
if (process.env.NODE_ENV === 'development') {
  const swaggerYaml = yaml.load(fs.readFileSync(SWAGGER_YAML_FILEPATH, 'utf8')) as Object;
  router.use('/dev/api-docs', swaggerUi.serve as any);
  router.get('/dev/api-docs', swaggerUi.setup(swaggerYaml, swaggerUiOptions) as any);
}

export default router;
