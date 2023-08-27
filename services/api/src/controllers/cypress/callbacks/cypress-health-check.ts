import winston from 'winston';
import {AnonymousEndpointCallback} from '../../../lib/endpoint-util';
import {CypressHealthCheckRequestBody, CypressHealthCheckRequestQuery} from '../schemas/cypress-health-check';
import {HttpStatus} from '../../../lib/enums/HttpStatus';

export const makeCypressHealthCheckCallback = (
    logger: winston.Logger,
): AnonymousEndpointCallback<CypressHealthCheckRequestBody, CypressHealthCheckRequestQuery> => async (req, res) => {
  logger.silly(`Cypress requested health check from ${req.ip}`);
  return res.status(HttpStatus.OK).send();
};
