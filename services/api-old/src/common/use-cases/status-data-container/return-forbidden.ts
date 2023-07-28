import {ReturnForbiddenFunction} from './types/return-forbidden.js';
import bunyan from 'bunyan';
import {HttpStatus} from '../../enums/HttpStatus.js';

/**
 * Helper function for returning HTTP 403 Forbidden errors.
 * @param {bunyan} logger used for logging
 * @return {StatusDataContainer}returns status data container with 403 Forbidden status
 */
export const makeReturnForbidden = (logger: bunyan): ReturnForbiddenFunction => {
  return function() {
    logger.info(`Access denied`);
    return {
      status: HttpStatus.FORBIDDEN,
      data: undefined,
    };
  };
};
