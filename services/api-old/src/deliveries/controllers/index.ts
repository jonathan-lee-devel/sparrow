import {makeCreateDeliveryController} from './create-delivery.js';
import {createDelivery, getAssignedDeliveries, markDeliveryAsDelivered, markDeliveryAsUndelivered} from '../services/index.js';
import {makeGetAssignedDeliveriesController} from './get-assigned-deliveries.js';
import {makeMarkDeliveryAsDeliveredController} from './mark-delivery-as-delivered.js';
import {makeMarkDeliveryAsUndeliveredController} from './mark-delivery-as-undelivered.js';

export const createDeliveryController = makeCreateDeliveryController(createDelivery);

export const getAssignedDeliveriesController = makeGetAssignedDeliveriesController(getAssignedDeliveries);

export const markDeliveryAsDeliveredController = makeMarkDeliveryAsDeliveredController(markDeliveryAsDelivered);

export const markDeliveryAsUndeliveredController = makeMarkDeliveryAsUndeliveredController(markDeliveryAsUndelivered);
