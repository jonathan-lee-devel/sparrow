import {Model} from 'mongoose';
import bunyan from 'bunyan';
import {Organization} from '../models/Organization.js';
import {User} from '../../main/models/User.js';
import {SearchOrganizationsFunction} from '../types/search-organizations.js';
import {OrganizationSnippetDto} from '../dtos/OrganizationSnippetDto';

/**
 * Closure for the service function which gets organization data by ID.
 * @param {bunyan} logger used for logging
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @return {GetOrganizationFunction} service function which gets organization data by ID
 */
export const makeSearchOrganizations = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): SearchOrganizationsFunction => {
  /**
     * Service function which gets organization data by ID.
     * @param {User} requestingUser user making the request
     * @param {string} searchString ID of the organization data to obtain
     * @return {Promise<StatusDataContainer<OrganizationDto>>} organization data obtained by ID
     */
  return async function searchOrganizations(
      requestingUser: User,
      searchString: string,
  ) {
    const organizations = await OrganizationModel.find({$text: {$search: searchString}});

    const organizationSnippets: OrganizationSnippetDto[] = [];
    for (const organization of organizations) {
      organizationSnippets.push({
        id: (await organization).id,
        name: ((await organization).name),
      });
    }

    return {
      status: 200,
      data: organizationSnippets,
    };
  };
};
