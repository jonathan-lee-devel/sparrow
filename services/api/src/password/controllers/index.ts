import {confirmPasswordReset, resetPassword} from '../services/index.js';
import {makeConfirmPasswordResetController} from './confirm-password-reset.js';
import {makeResetPasswordController} from './reset-password.js';

export const confirmPasswordResetController =
    makeConfirmPasswordResetController(confirmPasswordReset);

export const resetPasswordController =
    makeResetPasswordController(resetPassword);
