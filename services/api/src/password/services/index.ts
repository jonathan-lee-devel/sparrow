import {makeGenerateSalt} from './generate-salt.js';
import {makeEncodePassword} from './encode-password.js';
// eslint-disable-next-line max-len
import {makeGeneratePasswordResetVerificationToken} from './generate-password-reset-verification-token.js';
// eslint-disable-next-line max-len
import {PasswordResetVerificationTokenModel} from '../models/PasswordResetVerificationToken.js';
import {makeResetPassword} from './reset-password.js';
import {UserModel} from '../../main/models/User.js';
import {makeConfirmPasswordReset} from './confirm-password-reset.js';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {sendMail} from '../../util/email/exports/index.js';

const logger = loggerConfig();

const generateSalt = makeGenerateSalt();

export const encodePassword = makeEncodePassword(await generateSalt());

export const generatePasswordResetVerificationToken =
    makeGeneratePasswordResetVerificationToken(
        logger,
        PasswordResetVerificationTokenModel,
    );

export const resetPassword = makeResetPassword(
    logger,
    UserModel,
    PasswordResetVerificationTokenModel,
    generatePasswordResetVerificationToken,
    sendMail,
);

export const confirmPasswordReset = makeConfirmPasswordReset(
    logger,
    PasswordResetVerificationTokenModel,
    UserModel,
    encodePassword,
);
