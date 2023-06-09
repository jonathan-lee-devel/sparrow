import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {configureRoute} from '../../main/routes/configure-route.js';
import {HttpRequestMethod} from '../../main/enums/http-request-method.js';
import {createDeliveryValidationChain} from '../validation-chains/create-delivery.js';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback.js';
import {
  createDeliveryController,
  getAssignedDeliveriesController,
  markDeliveryAsDeliveredController,
  markDeliveryAsUndeliveredController,
} from '../controllers/index.js';

const router = express.Router();

const logger = loggerConfig();

configureRoute(router, HttpRequestMethod.POST, '/', true, createDeliveryValidationChain, makeExpressCallback(logger, createDeliveryController));

configureRoute(router, HttpRequestMethod.GET, '/assigned', true, [], makeExpressCallback(logger, getAssignedDeliveriesController));

configureRoute(router, HttpRequestMethod.PUT, '/:deliveryId/mark-delivered', true, [], makeExpressCallback(logger, markDeliveryAsDeliveredController));

configureRoute(router, HttpRequestMethod.PUT, '/:deliveryId/mark-undelivered', true, [], makeExpressCallback(logger, markDeliveryAsUndeliveredController));

export {router as DeliveriesRouter};
