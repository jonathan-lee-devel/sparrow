import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification.js';
import {GetNotificationByIdFunction} from '../types/get-notification-by-id.js';
import {User} from '../../main/models/User.js';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container/index.js';
import {NotificationType} from '../enums/NotificationType.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeGetNotificationById = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): GetNotificationByIdFunction => {
  return async function getNotificationById(
      requestingUser: User,
      notificationId: string) {
    logger.info(`GET notification with ID: ${notificationId}`);
    const notificationModel = await NotificationModel.findOne({id: notificationId}, {__v: 0}).exec();
    if (!notificationModel) {
      return returnNotFound();
    }
    if (notificationModel.targetUserEmail !== requestingUser.email) {
      return returnForbidden();
    }
    return {
      status: HttpStatus.OK,
      data: {
        targetUserEmail: notificationModel.targetUserEmail,
        title: notificationModel.title,
        content: notificationModel.content,
        isAcknowledged: notificationModel.isAcknowledged,
        timestamp: notificationModel.timestamp,
        id: notificationModel.id,
        type: NotificationType[notificationModel.type],
      },
    };
  };
};
