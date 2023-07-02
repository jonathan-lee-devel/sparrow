import {makeReturnNotFound} from './return-not-found.js';
import {makeReturnForbidden} from './return-forbidden.js';
import {makeReturnInternalServerError} from './return-internal-server-error.js';
import {loggerConfig} from '../../../main/config/logger/logger-config.js';

const logger = loggerConfig();

export const returnNotFound = makeReturnNotFound();

export const returnForbidden = makeReturnForbidden(logger);

export const returnInternalServerError =
    makeReturnInternalServerError();
