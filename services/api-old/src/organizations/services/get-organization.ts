import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization.js';
import {User} from '../../main/models/User.js';
import {GetOrganizationFunction} from '../types/get-organization.js';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container/index.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

/**
 * Closure for the service function which gets organization data by ID.
 * @param {bunyan} logger used for logging
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @return {GetOrganizationFunction} service function which gets organization data by ID
 */
export const makeGetOrganization = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): GetOrganizationFunction => {
  /**
     * Service function which gets organization data by ID.
     * @param {User} requestingUser user making the request
     * @param {string} organizationId ID of the organization data to obtain
     * @return {Promise<StatusDataContainer<OrganizationDto>>} organization data obtained by ID
     */
  return async function getOrganization(
      requestingUser: User,
      organizationId: string,
  ) {
    const organizationModel = await OrganizationModel.findOne({id: organizationId}, {__v: 0}).exec();
    logger.info(`GET organization by ID: ${organizationId}`);
    if (!organizationModel) {
      return returnNotFound();
    }

    if (!organizationModel.administratorEmails.includes(requestingUser.email) &&
                !organizationModel.memberEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

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
