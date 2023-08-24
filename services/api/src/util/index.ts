import {transporterConfig} from '../lib/nodemailer-transporter';
import {makeSendMail} from './email/send-mail';
import logger from '../logger';
import {EmailSendAttemptModel} from '../models/email/EmailSendAttempt';
import {generateId} from '../lib/generate-id';

const transporter = transporterConfig();

export const sendMail = makeSendMail(
    logger,
    EmailSendAttemptModel,
    generateId,
    transporter,
);
