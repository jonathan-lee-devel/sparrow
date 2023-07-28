import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {makeCreateNotification} from './create-notification.js';
import {generatedId} from '../../util/id/services/index.js';
import {NotificationModel} from '../models/Notification.js';
import {makeGetUnacknowledgedNotifications} from './get-unacknowledged-notifications.js';
import {makeGetAllNotifications} from './get-all-notifications.js';
import {makeGetNotificationById} from './get-notification-by-id.js';
import {makeAcknowledgeNotification} from './acknowledge-notification.js';

const logger = loggerConfig();

export const createNotification = makeCreateNotification(
    logger,
    generatedId,
    NotificationModel,
);

export const getUnacknowledgedNotifications = makeGetUnacknowledgedNotifications(
    logger,
    NotificationModel,
);

export const getAllNotifications = makeGetAllNotifications(
    logger,
    NotificationModel,
);

export const getNotificationById = makeGetNotificationById(
    logger,
    NotificationModel,
);

export const acknowledgeNotification = makeAcknowledgeNotification(
    logger,
    NotificationModel,
);
