import {transporterConfig} from '../lib/nodemailer-transporter';
import {makeSendMail} from './email/send-mail';
import logger from '../logger';
import {EmailSendAttemptModel} from '../models/email/EmailSendAttempt';
import {generateId} from '../lib/generate-id';
import {environment} from '../environment';
import {makeGenerateRegistrationVerificationToken} from './registration/generate-registration-verification-token';
import {RegistrationVerificationTokenModel} from '../models/users/registration/RegistrationVerificationToken';

const transporter = transporterConfig();

export const sendMail = makeSendMail(
    environment,
    logger,
    EmailSendAttemptModel,
    generateId,
    transporter,
);

export const generateRegistrationVerificationToken = makeGenerateRegistrationVerificationToken(
    logger,
    RegistrationVerificationTokenModel,
);
