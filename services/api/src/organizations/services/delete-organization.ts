import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization.js';
import {DeleteOrganizationFunction} from '../types/delete-organization.js';
import {User} from '../../main/models/User.js';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container/index.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeDeleteOrganization = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): DeleteOrganizationFunction => {
  return async function deleteOrganization(
      requestingUser: User,
      organizationId: string,
  ) {
    logger.info(`Request to delete organization with ID: ${organizationId}`);
    const organizationModel = await OrganizationModel.findOne({id: organizationId}, {__v: 0}).exec();
    if (!organizationModel) {
      return returnNotFound();
    }

    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    await OrganizationModel.deleteOne({id: organizationId}).exec();
    return {
      status: HttpStatus.OK,
      data: {
        id: organizationModel.id,
        name: organizationModel.name,
        administratorEmails: organizationModel.administratorEmails,
        memberEmails: organizationModel.memberEmails,
      },
    };
  };
};
