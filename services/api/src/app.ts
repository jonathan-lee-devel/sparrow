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
import {registerGoogleAuthRoute, registerGoogleRedirectRoute} from './lib/register-google-login-routes';
import passport from 'passport';
import {notFoundCallback} from './lib/not-found-callback';

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
registerGoogleAuthRoute(app, passport);
registerGoogleRedirectRoute(app, passport, environment);
app.use(notFoundCallback);
app.use(errorResponseHandler);

export default app;
