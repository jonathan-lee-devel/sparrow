import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Delivery} from '../models/Delivery.js';
import {GetAssignedDeliveriesFunction} from '../types/get-assigned-deliveries.js';
import {User} from '../../main/models/User.js';
import {DeliveryDto} from '../dto/DeliveryDto.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeGetAssignedDeliveries = (
    logger: bunyan,
    DeliveryModel: Model<Delivery>,
): GetAssignedDeliveriesFunction => {
  return async function getAssignedDeliveries(
      requestingUser: User,
  ) {
    logger.info(`Request to get all deliveries assigned to user with e-mail: <${requestingUser.email}>`);
    const deliveryModels = await DeliveryModel.find({assignedDriverEmail: requestingUser.email}, {__v: 0});
    const deliveryDtos: DeliveryDto[] = [];
    for (const deliveryModel of deliveryModels) {
      deliveryDtos.push({
        id: (await deliveryModel).id,
        creatorEmail: (await deliveryModel).creatorEmail,
        assignedDriverEmail: (await deliveryModel).assignedDriverEmail,
        organizationId: (await deliveryModel).organizationId,
        title: (await deliveryModel).title,
        details: (await deliveryModel).details,
        isDelivered: (await deliveryModel).isDelivered,
      });
    }

    return {
      status: HttpStatus.OK,
      data: deliveryDtos,
    };
  };
};
