import {transporterConfig} from '../lib/nodemailer-transporter';
import {makeSendMail} from './email/send-mail';
import logger from '../logger';
import {EmailSendAttemptModel} from '../models/email/EmailSendAttempt';
import {generateId} from '../lib/generate-id';
import {environment} from '../environment';

const transporter = transporterConfig();

export const sendMail = makeSendMail(
    environment,
    logger,
    EmailSendAttemptModel,
    generateId,
    transporter,
);
