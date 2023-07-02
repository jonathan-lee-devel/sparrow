import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification.js';
import {AcknowledgeNotificationFunction} from '../types/acknowledge-notification.js';
import {User} from '../../main/models/User.js';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container/index.js';
import {NotificationType} from '../enums/NotificationType.js';
import {errorMessageToDto} from '../../common/use-cases/errors/index.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeAcknowledgeNotification = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): AcknowledgeNotificationFunction => {
  return async function acknowledgeNotification(
      requestingUser: User,
      notificationId: string) {
    logger.info(`Acknowledge notification with ID: ${notificationId}`);
    const notificationModel = await NotificationModel.findOne({id: notificationId}, {__v: 0}).exec();
    if (!notificationModel) {
      return returnNotFound();
    }
    if (notificationModel.targetUserEmail !== requestingUser.email) {
      return returnForbidden();
    }
    if (notificationModel.isAcknowledged) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto('Notification is already acknowledged'),
      };
    }
    notificationModel.isAcknowledged = true;
    await notificationModel.save();
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
