import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {configureRoute} from '../../main/routes/configure-route.js';
import {HttpRequestMethod} from '../../main/enums/http-request-method.js';
import {createProductValidationChain} from '../validation-chains/create-product.js';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback.js';
import {createProductController, getProductsForOrganizationController} from '../controllers/index.js';

const router = express.Router();

const logger = loggerConfig();

configureRoute(router, HttpRequestMethod.GET, '/:organizationId', false, [], makeExpressCallback(logger, getProductsForOrganizationController));

configureRoute(router, HttpRequestMethod.POST, '/', true, createProductValidationChain, makeExpressCallback(logger, createProductController));

export {router as ProductsRouter};
