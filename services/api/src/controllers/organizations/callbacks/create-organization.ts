import winston from 'winston';
import {EndpointCallback} from '../../../lib/endpoint-util';
import {HttpStatus} from '../../../lib/enums/HttpStatus';
import {CreateOrganizationRequestBody, CreateOrganizationRequestQuery} from '../schemas/create-organization';

export const makeCreateOrganizationCallback = (
    logger: winston.Logger,
): EndpointCallback<CreateOrganizationRequestBody, CreateOrganizationRequestQuery> => {
  return async function createOrganizationCallback(req, res) {
    const {name} = req.body;
    logger.info(`Request to create organization with name: ${name}`);
    return res.status(HttpStatus.OK).json({name});
  };
};
