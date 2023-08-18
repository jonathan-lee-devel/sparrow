import winston from 'winston';
import {AnonymousEndpointCallback} from '../../../lib/endpoint-util';
import {HttpStatus} from '../../../lib/enums/HttpStatus';
import {SearchOrganizationsRequestBody, SearchOrganizationsRequestQuery} from '../schemas/search-organizations';
import {Model} from 'mongoose';
import {Organization} from '../../../models/organizations/Organization';
import {ModelTransformFunction} from '../../../lib/model-transform';
import {OrganizationSnippetDto} from '../../../dtos/organizations/OrganizationSnippetDto';

export const makeSearchOrganizationsCallback =(
    logger: winston.Logger,
    Organization: Model<Organization>,
    transform: ModelTransformFunction,
): AnonymousEndpointCallback<SearchOrganizationsRequestBody, SearchOrganizationsRequestQuery> => async (req, res) => {
  const {searchString} = req.params;
  logger.info(`Request to search organization with search string: ${searchString}`);

  const organizations = await Organization.find({$text: {$search: searchString}}).exec();
  const organizationDtos: OrganizationSnippetDto[] = [];
  for (const organization of organizations) {
    const organizationData = await organization;
    organizationDtos.push(organizationData.toJSON({transform}));
  }
  return res.status(HttpStatus.OK).json(organizationDtos);
};
