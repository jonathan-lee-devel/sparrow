import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';
import logger from './logger';
import User, { IUser } from './models/users/User';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

const app = express();

function logResponseTime(req: Request, res: Response, next: NextFunction) {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`;
    logger.log({
      level: 'debug',
      message,
      consoleLoggerOptions: { label: 'API' }
    });
  });

  next();
}

app.use(helmet.hidePoweredBy());
app.use(logResponseTime);
app.use(compression() as any);
const frontEndUrl = process.env.FRONT_END_URL ?? undefined;
app.use(cors({
  credentials: true,
  optionsSuccessStatus: 200,
  origin: frontEndUrl
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// @ts-ignore
app.use(cookieParser());
const sessionSecret = process.env.SESSION_SECRET ?? undefined;
if (!sessionSecret) {
  throw new Error('Session secret must be defined');
}
// @ts-ignore
app.use(expressSession({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));
const GoogleStrategy = passportGoogle.Strategy;
const googleClientId = process.env.GOOGLE_CLIENT_ID ?? undefined;
if (!googleClientId) {
  throw new Error('Google client ID must be defined');
}
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? undefined;
if (!googleClientSecret) {
  throw new Error('Google client secret must be defined');
}
const configurePassport = (): passport.PassportStatic => {
  passport.use('google', new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: passportGoogle.Profile,
      done: passportGoogle.VerifyCallback
    ): Promise<void> => {
      const existingUser = await User.findOne({ email: profile.emails?.[0].value }).exec();
      if (existingUser?.emailVerified) {
        if (existingUser.googleId === profile.id) {
          done(null, existingUser);
          return;
        }
        existingUser.googleId = profile.id;
        existingUser.emailVerified = true;
        await existingUser.save();
        done(null, existingUser);
        return;
      }
      const newUser = await User.create({
        email: profile.emails?.[0].value,
        googleId: profile.id,
        password: undefined,
        firstName: profile.displayName,
        lastName: undefined,
        emailVerified: true
      });
      done(null, newUser);
    }
  ));
  passport.use('local', new LocalStrategy(async (username, password, done): Promise<void> => {
    try {
      // @ts-ignore
      const foundUser: HydratedDocument<IUser> = await User.findOne({ email: username }).exec();

      if (!foundUser) {
        return done(null, false, { message: 'Invalid username' });
      }

      if (!foundUser.password) {
        return done(null, false, { message: 'User is not registered via e-mail' });
      }

      if (!foundUser.emailVerified) {
        return done(null, false, { message: 'User\'s e-mail not verified' });
      }

      const validPassword = await bcrypt.compare(password, foundUser.password);
      if (!validPassword) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, foundUser);
    } catch (err) {
      if (err) return done(err);
    }
    return done(new Error('Unrecognized state'));
  }));
  // @ts-ignore
  passport.serializeUser((user: HydratedDocument<User>, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done): Promise<void> => {
    User.findById(id).exec()
      .then(user => {
        done(null, user);
      })
      .catch(reason => {
        done(reason, null);
      });
  });
  return passport;
};

const configuredPassport: passport.PassportStatic = configurePassport();
// @ts-ignore
app.use(configuredPassport.initialize());
app.use(configuredPassport.session());

app.use(routes);

app.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  // @ts-ignore
  logger.info(`Successful Google authentication for: <${req.user.email}>`);
  res.redirect(`${frontEndUrl}/google-login-success`);
});

// Root 200 OK for Cypress server health-check
app.get('/', (_req, res, _next) => res.status(200).send());

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
    res.json({ error: err });
  },
);

export default app;
