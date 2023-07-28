import {makeSendMailCallback} from './inner/send-mail-callback.js';
import {transporterConfig} from '../config/Email.js';
import {makeSendMail} from './send-mail.js';
import {makeVerifyEmail} from './verify-email.js';
import {loggerConfig} from '../../../main/config/logger/logger-config.js';

const logger = loggerConfig();

export const sendMail = makeSendMail(
    logger,
    transporterConfig(),
    makeSendMailCallback(logger),
);

export const verifyEmail = makeVerifyEmail();
