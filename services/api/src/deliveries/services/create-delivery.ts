import bunyan from 'bunyan';
import {GenerateIdFunction} from '../../util/id/types/generate-id.js';
import {Model} from 'mongoose';
import {Delivery} from '../models/Delivery.js';
import {CreateDeliveryFunction} from '../types/create-delivery.js';
import {DeliveryRequestDto} from '../dto/DeliveryRequestDto.js';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length.js';
import {returnForbidden} from '../../common/use-cases/status-data-container/index.js';
import {User} from '../../main/models/User.js';
import {Organization} from '../../organizations/models/Organization.js';
import {errorMessageToDto} from '../../common/use-cases/errors/index.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeCreateDelivery = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    OrganizationModel: Model<Organization>,
    DeliveryModel: Model<Delivery>,
): CreateDeliveryFunction => {
  return async function createDelivery(
      requestingUser: User,
      delivery: DeliveryRequestDto,
  ) {
    logger.info(`Request to create new delivery from user with e-mail: <${requestingUser.email}>`);
    const organizationModel = await OrganizationModel.findOne({id: delivery.organizationId}, {__v: 0}).exec();
    if (!organizationModel) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto(`Organization with ID: ${delivery.organizationId} does not exist`),
      };
    }

    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    const newDelivery: Delivery = {
      id: await generateId(DEFAULT_ID_LENGTH),
      creatorEmail: requestingUser.email,
      ...delivery,
    };

    await new DeliveryModel(newDelivery).save();
    logger.info(`Successfully created new delivery with ID: ${newDelivery.id}`);
    return {
      status: HttpStatus.CREATED,
      data: {
        ...newDelivery,
      },
    };
  };
};
