import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import {Strategy as LocalStrategy} from 'passport-local';
import {HydratedDocument, Model} from 'mongoose';
import {User} from '../../models/User';
import bunyan from 'bunyan';

const GoogleStrategy = passportGoogle.Strategy;

/**
 * Passport configuration.
 * @param {bunyan} logger used for logging
 * @param {Model<User>} UserModel user model used to represent logged-in user
 * @return {Passport} passport config
 */
export const configurePassport =
    (logger: bunyan, UserModel: Model<User>): passport.PassportStatic => {
      logger.info('Configuring passport with provided user model');
      passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      }, async (accessToken, refreshToken, profile, done): Promise<void> => {
        const user = await UserModel.findOne({googleId: profile.id}).exec();

        if (!user) {
          const newUser = await UserModel.create({
            email: profile.emails?.[0].value,
            googleId: profile.id,
            password: undefined,
            firstName: profile.displayName,
            lastName: undefined,
            emailVerified: true,
          });
          if (newUser) {
            done(null, newUser);
          }
        } else {
          done(null, user);
        }
      }));
      passport.use(
          'local',
          new LocalStrategy(async (username, password, done): Promise<void> => {
            try {
              const foundUser: HydratedDocument<User> = await UserModel.findOne({email: username}).exec();

              if (!foundUser) {
                return done(null, false, {message: 'Invalid username'});
              }

              if (!foundUser.password) {
                return done(null, false, {message: 'User is not registered via e-mail'});
              }

              if (!foundUser.emailVerified) {
                return done(null, false, {message: 'User\'s email not verified'});
              }

              const validPassword = await bcrypt.compare(password, foundUser.password);
              if (!validPassword) {
                return done(null, false, {message: 'Invalid password'});
              }

              return done(null, foundUser);
            } catch (err) {
              if (err) return done(err);
            }
          }),
      );

      passport.serializeUser((user: HydratedDocument<User>, done) => {
        done(null, user.id);
      });

      passport.deserializeUser(async (id, done): Promise<void> => {
        UserModel.findById(id).exec()
            .then((user: User) => {
              done(null, user);
            })
            .catch((reason) => {
              done(reason, null);
            });
      });

      return passport;
    };
