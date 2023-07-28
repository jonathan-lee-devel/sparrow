import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification.js';
import {User} from '../../main/models/User.js';
import {returnInternalServerError} from '../../common/use-cases/status-data-container/index.js';
import {GetUnacknowledgedNotificationsFunction} from '../types/get-unacknowledged-notifications.js';
import {NotificationDto} from '../dto/NotificationDto.js';
import {NotificationType} from '../enums/NotificationType.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeGetUnacknowledgedNotifications = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): GetUnacknowledgedNotificationsFunction => {
  return async function getUnacknowledgedNotifications(
      requestingUser: User,
  ) {
    const notificationModels: Notification[] = await NotificationModel.find({
      targetUserEmail: requestingUser.email,
      isAcknowledged: false,
    });
    logger.info(`GET unacknowledged notifications for user with e-mail: <${requestingUser.email}>`);
    if (!notificationModels) {
      return returnInternalServerError();
    }
    const notificationDtos: NotificationDto[] = [];
    for (const notificationModel of notificationModels) {
      notificationDtos.push({
        id: notificationModel.id,
        targetUserEmail: notificationModel.targetUserEmail,
        title: notificationModel.title,
        content: notificationModel.content,
        isAcknowledged: notificationModel.isAcknowledged,
        type: NotificationType[notificationModel.type],
        timestamp: notificationModel.timestamp,
      });
    }

    return {
      status: HttpStatus.OK,
      data: notificationDtos,
    };
  };
};
