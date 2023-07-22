import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import {configureExpressSession} from './config/auth/configure-express-session.js';
import {configurePassport} from './config/auth/configure-passport.js';
import {configureCors} from './config/auth/configure-cors.js';
import {connectToDatabase} from './config/database/connect-to-database.js';
import {loggerConfig} from './config/logger/logger-config.js';
import {UserModel} from './models/User.js';
import {AuthRouter} from './routes/index.js';
import {RegistrationRouter} from '../registration/routes/index.js';
import {PasswordResetRouter} from '../password/routes/index.js';
import {ProfileRouter} from '../profile/routes/index.js';
import {OrganizationsRouter} from '../organizations/routes/index.js';
import {NotificationsRouter} from '../notifications/routes/index.js';
import {DeliveriesRouter} from '../deliveries/routes/index.js';
import {ProductsRouter} from '../products/routes/index.js';

dotenv.config();

const logger = loggerConfig();

const app = express();
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(configureExpressSession(logger));

const passport = configurePassport(logger, UserModel);
app.use(passport.initialize());
app.use(passport.session());

app.use(configureCors(logger));

connectToDatabase(logger);

app.use('/auth', AuthRouter);
app.use('/register', RegistrationRouter);
app.use('/password', PasswordResetRouter);
app.use('/profile', ProfileRouter);
app.use('/organizations', OrganizationsRouter);
app.use('/notifications', NotificationsRouter);
app.use('/deliveries', DeliveriesRouter);
app.use('/products', ProductsRouter);

// Root 200 OK for Cypress server health-check
app.get('/', (_req, res, _next) => {
  return res.status(200).send();
});

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use(
    (
        err: { message: string; status: string },
        req: any,
        res: {
            locals: { message: any; error: any };
            status: (arg0: any) => void;
            json: (arg0: { error: any }) => void;
        },
        _: any,
    ) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      logger.error(
          `Error at ${req.url}: {"status":"${err.status}", "message":"${err.message}"}`,
      );
      res.status(err.status || 500);
      res.json({error: err});
    },
);

export {app};
