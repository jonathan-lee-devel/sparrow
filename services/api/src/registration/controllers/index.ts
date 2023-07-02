import {makeConfirmRegistrationController} from './confirm-registration.js';
import {confirmRegistration, registerUser} from '../services/index.js';
import {makeRegisterUserController} from './register-user.js';

export const registerUserController =
    makeRegisterUserController(registerUser);

export const confirmRegistrationController =
    makeConfirmRegistrationController(confirmRegistration);
