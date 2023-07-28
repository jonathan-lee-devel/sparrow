import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {makeGetProfile} from './get-profile.js';
import {UserModel} from '../../main/models/User.js';
import {makeUpdateProfile} from './update-profile.js';

const logger = loggerConfig();

export const getProfile = makeGetProfile(
    logger,
    UserModel,
);

export const updateProfile = makeUpdateProfile(
    logger,
    UserModel,
);
