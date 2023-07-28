import { AuthenticatedRequest, NextFunction, Response } from 'express';
import requestMiddleware from '../../../middleware/request-middleware';
import logger from '../../../logger';
import { HttpStatus } from '../../../common/enums/HttpStatus';

export const makePostHandler = () => async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // eslint-disable-next-line consistent-return
  req.logout(err => {
    if (err) {
      logger.error(`An error has occurred during logout: ${err}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ logoutStatus: 'FAILURE' });
    }
  });
  return res.status(HttpStatus.OK).json({ logoutStatus: 'SUCCESS' });
};

// @ts-ignore
export default requestMiddleware(makePostHandler(), { requiresAuthentication: true });
