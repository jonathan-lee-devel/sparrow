import {makeMakeRegisterUserEndpoint} from './endpoionts/register-user';
import {returnAnonymouslyBasedOnSafeParseResult} from '../../lib/endpoint-util';
import {RegisterUserRequestBodySchema, RegisterUserRequestQuerySchema} from './schemas/register-user';
import {makeRegisterUserCallback} from './callbacks/register-user';
import logger from '../../logger';
import {
  encodePassword,
  generatePasswordResetVerificationToken,
  generateRegistrationVerificationToken,
  handleExistingUser,
  sendMail,
} from '../../util';
import {UserModel} from '../../models/users/User';
import {environment} from '../../environment';

export const registerUserHandler = makeMakeRegisterUserEndpoint(returnAnonymouslyBasedOnSafeParseResult)(
    RegisterUserRequestBodySchema,
    RegisterUserRequestQuerySchema,
    makeRegisterUserCallback(
        logger,
        handleExistingUser,
        generateRegistrationVerificationToken,
        generatePasswordResetVerificationToken,
        encodePassword,
        UserModel,
        sendMail,
        environment),
);
