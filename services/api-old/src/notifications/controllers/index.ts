import {makeGetUnacknowledgedNotificationsController} from './get-unacknowldged-notifications.js';
import {
  acknowledgeNotification,
  getAllNotifications,
  getNotificationById,
  getUnacknowledgedNotifications,
} from '../services/index.js';
import {makeGetAllNotificationsController} from './get-all-notifications.js';
import {makeGetNotificationByIdController} from './get-notification-by-id.js';
import {makeAcknowledgeNotificationController} from './acknowledge-notification.js';

export const getUnacknowledgedNotificationsController =
    makeGetUnacknowledgedNotificationsController(getUnacknowledgedNotifications);

export const getAllNotificationsController =
    makeGetAllNotificationsController(getAllNotifications);

export const getNotificationByIdController =
    makeGetNotificationByIdController(getNotificationById);

export const acknowledgeNotificationController =
    makeAcknowledgeNotificationController(acknowledgeNotification);
