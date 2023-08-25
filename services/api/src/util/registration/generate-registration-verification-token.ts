import winston from 'winston';
import {Model} from 'mongoose';
import {RegistrationVerificationToken} from '../../models/users/registration/RegistrationVerificationToken';
import {randomBytes} from 'crypto';
import addMinutes from 'date-fns/addMinutes';
import {DEFAULT_TOKEN_BUFFER_ENCODING} from '../../constants/token/token';

export type GenerateRegistrationVerificationTokenFunction = (
  tokenSize: number,
  expiryTimeMinutes: number,
  userEmail: string,
) => Promise<RegistrationVerificationToken>;

export const makeGenerateRegistrationVerificationToken = (
    logger: winston.Logger,
    RegistrationVerificationToken: Model<RegistrationVerificationToken>,
): GenerateRegistrationVerificationTokenFunction => async (
    tokenSize,
    expiryTimeMinutes,
    userEmail,
) => {
  const registrationVerificationToken: RegistrationVerificationToken = {
    value: randomBytes(tokenSize / 2).toString(DEFAULT_TOKEN_BUFFER_ENCODING),
    expiryDate: addMinutes(new Date(), expiryTimeMinutes),
    userEmail,
  };
  await RegistrationVerificationToken.create(registrationVerificationToken);

  logger.info(`Generated registration verification token for user with e-mail: <${userEmail}>`);
  return registrationVerificationToken;
};
