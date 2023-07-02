import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {ResetPasswordFunction} from '../types/reset-password.js';
import {User} from '../../main/models/User.js';
import {PasswordResetStatus} from '../enums/PasswordResetStatus.js';
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken.js';
import {GeneratePasswordResetVerificationTokenFunction} from '../types/generate-password-reset-verification-token.js';
import {SendMailFunction} from '../../util/email/types/send-mail.js';
import {DEFAULT_TOKEN_SIZE} from '../../util/token/default-token-size.js';
import {DEFAULT_TOKEN_EXPIRY_TIME_MINUTES} from '../../util/token/default-token-expiry-time-minutes.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeResetPassword = (
    logger: bunyan,
    UserModel: Model<User>,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
    generatePasswordResetVerificationToken:
        GeneratePasswordResetVerificationTokenFunction,
    sendMail: SendMailFunction,
): ResetPasswordFunction => {
  return async function resetPassword(
      email: string,
  ) {
    const userModel = await UserModel.findOne({email}, {__v: 0}).exec();
    if (!userModel) {
      return {
        status: HttpStatus.OK,
        data: {
          status: PasswordResetStatus[
              PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
          ],
        },
      };
    }

    const passwordResetVerificationTokenModel =
                await PasswordResetVerificationTokenModel
                    .findOne({userEmail: email}, {__v: 0}).exec();
    if (!passwordResetVerificationTokenModel) {
      logger.error(`Password reset token does not exist for user: ${email}`);
      return {
        status: HttpStatus.OK,
        data: {
          status: PasswordResetStatus[
              PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
          ],
        },
      };
    }

    await PasswordResetVerificationTokenModel
        .deleteOne({value: passwordResetVerificationTokenModel.value});
    const passwordResetVerificationTokenContainer =
                await generatePasswordResetVerificationToken(
                    DEFAULT_TOKEN_SIZE,
                    DEFAULT_TOKEN_EXPIRY_TIME_MINUTES,
                    email,
                );
    if (passwordResetVerificationTokenContainer.status !== HttpStatus.CREATED) {
      logger.error(`generatePasswordResetVerificationToken returned ${
        passwordResetVerificationTokenContainer.status
      }`);
      return {
        status: HttpStatus.OK,
        data: {
          status: PasswordResetStatus[
              PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
          ],
        },
      };
    }
    // Mail is slow to send and can be sent asynchronously, hence, no await
    sendMail(email, 'Password Reset',
        // eslint-disable-next-line max-len
        `<h4>Please click the following link to reset your password: <a href="${process.env.FRONT_END_URL}/reset-password/confirm/${passwordResetVerificationTokenContainer.data.value}">Reset Password</a></h4>`)
        .catch((reason) => {
          logger.error(`An error has occurred while sending mail: ${reason}`);
        });
    return {
      status: HttpStatus.OK,
      data: {
        status: PasswordResetStatus[
            PasswordResetStatus.AWAITING_EMAIL_VERIFICATION
        ],
      },
    };
  };
};
