import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {sendMail} from '../../util/email/exports/index.js';
import {makeHandleExistingUser} from './inner/handle-existing-user.js';
import {UserModel} from '../../main/models/User.js';
// eslint-disable-next-line max-len
import {makeGenerateRegistrationVerificationToken} from './generate-registration-verification-token.js';
// eslint-disable-next-line max-len
import {RegistrationVerificationTokenModel} from '../models/RegistrationVerificationToken.js';
import {makeRegisterUser} from './register-user.js';
// eslint-disable-next-line max-len
import {encodePassword, generatePasswordResetVerificationToken} from '../../password/services/index.js';
// eslint-disable-next-line max-len
import {PasswordResetVerificationTokenModel} from '../../password/models/PasswordResetVerificationToken.js';
import {makeConfirmRegistration} from './confirm-registration.js';

const logger = loggerConfig();

const handleExistingUser = makeHandleExistingUser(
    logger,
    UserModel,
    RegistrationVerificationTokenModel,
    PasswordResetVerificationTokenModel,
);

const generateRegistrationVerificationToken =
    makeGenerateRegistrationVerificationToken(
        logger,
        RegistrationVerificationTokenModel,
    );

export const registerUser = makeRegisterUser(
    logger,
    handleExistingUser,
    generateRegistrationVerificationToken,
    generatePasswordResetVerificationToken,
    encodePassword,
    UserModel,
    sendMail,
);

export const confirmRegistration = makeConfirmRegistration(
    logger,
    RegistrationVerificationTokenModel,
    UserModel,
);
