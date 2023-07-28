import express from 'express';
import {configureLoginRoute} from './login-route.js';
import {configureLogoutRoute} from './logout-route.js';
import {loggerConfig} from '../config/logger/logger-config.js';
import passport from 'passport';

const router = express.Router();

const logger = loggerConfig();

configureLoginRoute(router, logger, '/login');

configureLogoutRoute(router, logger, '/logout');

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // @ts-ignore
  logger.info(`Successful Google authentication: ${req.user.email}`);
  res.redirect(`${process.env.FRONT_END_URL}/google-login-success`);
});

export {router as AuthRouter};
