import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {configureRoute} from '../../main/routes/configure-route.js';
import {HttpRequestMethod} from '../../main/enums/http-request-method.js';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback.js';
import {confirmRegistrationController, registerUserController} from '../controllers/index.js';
import {registerUserValidationChain} from '../validation-chains/register-user.js';
import {confirmRegistrationValidationChain} from '../validation-chains/confirm-registration.js';

const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/',
    false,
    registerUserValidationChain,
    makeExpressCallback(logger, registerUserController),
);

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/confirm',
    false,
    confirmRegistrationValidationChain,
    makeExpressCallback(logger, confirmRegistrationController),
);

export {router as RegistrationRouter};
