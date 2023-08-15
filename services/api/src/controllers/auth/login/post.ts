import {NextFunction, Request, Response} from 'express';
import passport from 'passport';
import {IUser} from '../../../models/users/User';
import logger from '../../../logger';
import requestMiddleware from '../../../middleware/request-middleware';
import {HttpStatus} from '../../../lib/enums/HttpStatus';

export const makePostHandler = () => async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('local', (err: any, user: IUser, _: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({loginStatus: 'FAILURE'});
    }

    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      logger.info(`Successful login for user with e-mail: <${user.email}>`);
      return res.status(HttpStatus.OK).json({
        loginStatus: 'SUCCESS',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    });
  })(req, res, next);
};

export default requestMiddleware(makePostHandler(), {requiresAuthentication: false});
