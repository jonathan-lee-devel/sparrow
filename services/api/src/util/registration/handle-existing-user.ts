import winston from 'winston';
import {Model} from 'mongoose';
import {User} from '../../models/users/User';
import {RegistrationVerificationToken} from '../../models/users/registration/RegistrationVerificationToken';
import {PasswordResetVerificationToken} from '../../models/users/password/PasswordResetVerificationToken';

export type HandleExistingUserFunction = (email: string) => Promise<boolean>;

export const makeHandleExistingUser = (
    logger: winston.Logger,
    User: Model<User>,
    RegistrationVerificationToken: Model<RegistrationVerificationToken>,
    PasswordResetVerificationToken: Model<PasswordResetVerificationToken>,
): HandleExistingUserFunction => async (email) => {
  const existingUser = await User.findOne({email}).exec();
  if (!existingUser) {
    logger.info(`No user found for e-mail: <${email}>, deleting any possible associated tokens`);
    await RegistrationVerificationToken.deleteOne({userEmail: email}).exec();
    await PasswordResetVerificationToken.deleteOne({userEmail: email}).exec();
    return false;
  }
  if (existingUser && !existingUser.emailVerified && !existingUser.googleId) {
    logger.info(`Existing user: <${email}> detected without verified e-mail or Google ID, deleting user and any possible associated tokens`);
    await User.deleteOne({email});
    await RegistrationVerificationToken.deleteOne({userEmail: email});
    await PasswordResetVerificationToken.deleteOne({userEmail: email});
    return false;
  }
  return true;
};
