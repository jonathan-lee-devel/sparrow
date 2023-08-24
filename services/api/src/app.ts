import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import routes from './routes';
import {environment} from './environment';
import {logResponseTime} from './lib/log-response-time';
import {configurePassport} from './lib/configure-passport';
import {errorResponseHandler} from './lib/error-response-handler';
import passport from 'passport';
import {notFoundCallback} from './lib/not-found-callback';
import logger from './logger';
import {sendMail} from './util';

const app = express();

app.use(helmet.hidePoweredBy());
app.use(logResponseTime);
app.use(compression() as any);
app.use(cors({credentials: true, optionsSuccessStatus: 200, origin: environment.FRONT_END_URL}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// @ts-ignore
app.use(cookieParser());
// @ts-ignore
app.use(expressSession({secret: environment.SESSION_SECRET, resave: false, saveUninitialized: false}));
const configuredPassport = configurePassport();
// @ts-ignore
app.use(configuredPassport.initialize());
app.use(configuredPassport.session());
app.use(routes);
app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  // @ts-ignore
  logger.info(`Successful Google authentication for: <${req.user.email}>`);
  res.redirect(`${environment.FRONT_END_URL}/google-login-success`);
});
app.use(notFoundCallback);
app.use(errorResponseHandler);

const main = async () => {
  await sendMail('test-not-valid', 'Test', 'This is a test');
};
main().catch((err) => logger.error(`Mail main error: ${err}`));

export default app;
