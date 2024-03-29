import winston from 'winston';
import {AuthenticatedEndpointCallback} from '../../../lib/endpoint-util';
import {LogoutRequestBody, LogoutRequestQuery} from '../schemas/logout';
import {HttpStatus} from '../../../lib/enums/HttpStatus';

export const makeLogoutCallback = (
    logger: winston.Logger,
): AuthenticatedEndpointCallback<LogoutRequestBody, LogoutRequestQuery> => async (req, res) => {
  req.logout((err) => {
    if (err) {
      logger.error(`An error has occurred during logout: ${err}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({logoutStatus: 'FAILURE'});
    }
  });
  return res.status(HttpStatus.OK).json({logoutStatus: 'SUCCESS'});
};
