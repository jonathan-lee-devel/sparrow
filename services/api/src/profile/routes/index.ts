import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {configureRoute} from '../../main/routes/configure-route.js';
import {HttpRequestMethod} from '../../main/enums/http-request-method.js';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback.js';
import {updateProfileValidationChain} from '../validation-chains/update-profile.js';
import {getProfileController, updateProfileController} from '../controllers/index.js';

// eslint-disable-next-line new-cap
const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.GET,
    '/',
    true,
    [],
    makeExpressCallback(logger, getProfileController),
);

configureRoute(
    router,
    HttpRequestMethod.PATCH,
    '/update',
    true,
    updateProfileValidationChain,
    makeExpressCallback(logger, updateProfileController),
);

export {router as ProfileRouter};
