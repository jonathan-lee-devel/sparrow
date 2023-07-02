import {makeGetProfileController} from './get-profile.js';
import {getProfile, updateProfile} from '../services/index.js';
import {makeUpdateProfileController} from './update-profile.js';

export const getProfileController =
    makeGetProfileController(getProfile);

export const updateProfileController =
    makeUpdateProfileController(updateProfile);
