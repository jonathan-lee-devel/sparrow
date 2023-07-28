import {makeCreateDelivery} from './create-delivery.js';
import {generatedId} from '../../util/id/services/index.js';
import {DeliveryModel} from '../models/Delivery.js';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {OrganizationModel} from '../../organizations/models/Organization.js';
import {makeGetAssignedDeliveries} from './get-assigned-deliveries.js';
import {makeMarkDeliveryAsDelivered} from './mark-delivery-as-delivered.js';
import {makeMarkDeliveryAsUndelivered} from './mark-delivery-as-undelivered.js';

const logger = loggerConfig();

export const createDelivery = makeCreateDelivery(logger, generatedId, OrganizationModel, DeliveryModel);

export const getAssignedDeliveries = makeGetAssignedDeliveries(logger, DeliveryModel);

export const markDeliveryAsDelivered = makeMarkDeliveryAsDelivered(logger, DeliveryModel, OrganizationModel);

export const markDeliveryAsUndelivered = makeMarkDeliveryAsUndelivered(logger, DeliveryModel, OrganizationModel);
