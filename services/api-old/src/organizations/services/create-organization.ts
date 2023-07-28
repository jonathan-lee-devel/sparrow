import bunyan from 'bunyan';
import {GenerateIdFunction} from '../../util/id/types/generate-id.js';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization.js';
import {User} from '../../main/models/User.js';
import {CreateOrganizationFunction} from '../types/create-organization.js';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

/**
 * Closure for the service function which creates an organization.
 * @param {bunyan} logger used for logging
 * @param {GenerateIdFunction} generateId used to generate ID for newly created organization
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @return {CreateOrganizationFunction} service function which creates an organization
 */
export const makeCreateOrganization = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    OrganizationModel: Model<Organization>,
): CreateOrganizationFunction => {
  /**
     * Service function which creates an organization.
     * @param {User} requestingUser user making the request
     * @param {string} name name of the organization to create
     * @return {Promise<StatusDataContainer<OrganizationDto>>} newly created organization DTO
     */
  return async function createOrganization(
      requestingUser: User,
      name: string,
  ) {
    const organization: Organization = {
      id: await generateId(DEFAULT_ID_LENGTH),
      name,
      administratorEmails: [requestingUser.email],
      memberEmails: [],
    };

    await new OrganizationModel(organization).save();
    logger.info(`POST new organization with ID: ${organization.id}`);
    return {
      status: HttpStatus.CREATED,
      data: {
        ...organization,
      },
    };
  };
};
