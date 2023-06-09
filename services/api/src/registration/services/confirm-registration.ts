import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {RegistrationVerificationToken} from '../models/RegistrationVerificationToken.js';
import {ConfirmRegistrationFunction} from '../types/confirm-registration.js';
import {RegistrationStatus} from '../enums/RegistrationStatus.js';
import {User} from '../../main/models/User.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeConfirmRegistration = (
    logger: bunyan,
    RegistrationVerificationTokenModel: Model<RegistrationVerificationToken>,
    UserModel: Model<User>,
): ConfirmRegistrationFunction => {
  return async function confirmRegistration(tokenValue: string) {
    const tokenModel = await RegistrationVerificationTokenModel
        .findOne({value: tokenValue}, {__v: 0}).exec();
    if (!tokenModel) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          status: RegistrationStatus[RegistrationStatus.INVALID_TOKEN],
        },
      };
    }

    const userModel = await UserModel.findOne({email: tokenModel.userEmail}).exec();
    if (!userModel) {
      logger.error(`No user found for registration verification token with userEmail: <${tokenModel.userEmail}>`);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          status: RegistrationStatus[RegistrationStatus.FAILURE],
        },
      };
    }
    if (tokenModel.expiryDate.getTime() < new Date().getTime()) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          status: RegistrationStatus[RegistrationStatus.EMAIL_VERIFICATION_EXPIRED],
        },
      };
    }
    userModel.emailVerified = true;
    await userModel.save();
    tokenModel.expiryDate = new Date();
    await tokenModel.save();
    logger.info(`Successful registration confirmation for user with e-mail: <${userModel.email}>`);
    return {
      status: HttpStatus.OK,
      data: {
        status: RegistrationStatus[RegistrationStatus.SUCCESS],
      },
    };
  };
};
