import winston from 'winston';
import {AuthenticatedEndpointCallback} from '../../../lib/endpoint-util';
import {HttpStatus} from '../../../lib/enums/HttpStatus';
import {CreateOrganizationRequestBody, CreateOrganizationRequestQuery} from '../schemas/create-organization';
import {IOrganizationModel} from '../../../models/organizations/Organization';
import {GenerateIdFunction} from '../../../lib/generate-id';
import {DEFAULT_ID_LENGTH} from '../../../constants/auth';
import {ModelTransformFunction} from '../../../lib/model-transform';

export const makeCreateOrganizationCallback = (
    logger: winston.Logger,
    Organization: IOrganizationModel,
    generateId: GenerateIdFunction,
    transform: ModelTransformFunction,
): AuthenticatedEndpointCallback<CreateOrganizationRequestBody, CreateOrganizationRequestQuery> => {
  return async (req, res) => {
    const requestingUserEmail: string = req.user.email;
    const {name} = req.body;
    logger.info(`Request to from <${requestingUserEmail}> create organization with name: ${name}`);

    const organization = await Organization.create({
      id: await generateId(DEFAULT_ID_LENGTH),
      name,
      administratorEmails: [requestingUserEmail],
      memberEmails: [],
    });

    logger.info(`User <${requestingUserEmail}> created organization with ID: ${organization.id}`);

    return res.status(HttpStatus.CREATED).json(organization.toJSON({transform}));
  };
};
