import {makeGenerateId} from './generate-id.js';
import {loggerConfig} from '../../../main/config/logger/logger-config.js';

const logger = loggerConfig();

export const generatedId = makeGenerateId(logger);
