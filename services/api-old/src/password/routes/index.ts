import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {configureRoute} from '../../main/routes/configure-route.js';
import {HttpRequestMethod} from '../../main/enums/http-request-method.js';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback.js';
import {resetPasswordValidationChain} from '../validation-chains/reset-password.js';
import {confirmPasswordResetController, resetPasswordController} from '../controllers/index.js';
import {confirmPasswordResetValidationChain} from '../validation-chains/confirm-password-reset.js';

const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/reset',
    false,
    resetPasswordValidationChain,
    makeExpressCallback(logger, resetPasswordController),
);

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/reset/confirm',
    false,
    confirmPasswordResetValidationChain,
    makeExpressCallback(logger, confirmPasswordResetController),
);

export {router as PasswordResetRouter};
