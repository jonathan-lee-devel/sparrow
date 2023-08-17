import winston from 'winston';
import {IOrganizationModel} from '../../../models/organizations/Organization';
import {ModelTransformFunction} from '../../../lib/model-transform';
import {AnonymousEndpointCallback} from '../../../lib/endpoint-util';
import {HttpStatus} from '../../../lib/enums/HttpStatus';
import {GetOrganizationSnippetRequestBody, GetOrganizationSnippetRequestQuery} from '../schemas/get-organization-snippet';

export const makeGetOrganizationSnippetCallback = (
    logger: winston.Logger,
    Organization: IOrganizationModel,
    transform: ModelTransformFunction,
): AnonymousEndpointCallback<GetOrganizationSnippetRequestBody, GetOrganizationSnippetRequestQuery> => async (req, res) => {
  const {organizationId} = req.params;
  logger.info(`Request to get organization snippet for organization with ID: ${organizationId}`);

  const organization = await Organization.findOne({id: organizationId}).exec();
  return (!organization) ?
    res.status(HttpStatus.NOT_FOUND).send() :
    res.status(HttpStatus.OK).json(organization.toJSON({transform}));
};
