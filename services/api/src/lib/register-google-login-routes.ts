import passport from 'passport';
import logger from '../logger';
import {Environment} from '../environment';
import {Express} from 'express';

export const registerGoogleAuthRoute = (app: Express, passport: passport.PassportStatic) => () => {
  app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));
};

export const registerGoogleRedirectRoute = (app: Express, passport: passport.PassportStatic, environment: Environment) => {
  app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    // @ts-ignore
    logger.info(`Successful Google authentication for: <${req.user.email}>`);
    res.redirect(`${environment.FRONT_END_URL}/google-login-success`);
  });
};
