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
 * @param UserModel user model used to represent logged-in user
 */
export const configurePassport =
    (logger: bunyan, UserModel: Model<User>): passport.PassportStatic => {
      logger.info('Configuring passport with provided user model');
      passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      }, async (accessToken, refreshToken, profile, done) => {
        const user = await UserModel.findOne({googleId: profile.id}).exec();

        if (!user) {
          const newUser = await new UserModel({
            email: profile.emails?.[0].value,
            googleId: profile.id,
            password: undefined,
            firstName: profile.displayName,
            lastName: undefined,
            emailVerified: true,
          })
              .save();
          if (newUser) {
            done(null, newUser);
          }
        } else {
          done(null, user);
        }
      }));
      passport.use(
          'local',
          new LocalStrategy(async (username, password, done) => {
            try {
              const foundUser: HydratedDocument<User> = await UserModel.findOne({email: username}).exec();

              if (!foundUser) {
                return done(null, false, {message: 'Invalid username'});
              }

              if (!foundUser.password) {
                return done(null, false, {
                  message: 'User is not registered via e-mail',
                });
              }

              if (!foundUser.emailVerified) {
                return done(null, false, {
                  message: 'User\'s email not verified',
                });
              }

              const validPassword = await bcrypt.compare(
                  password,
                  foundUser.password,
              );
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

      passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err: any, user: User) => {
          done(err, user);
        });
      });

      return passport;
    };
