import {body, ValidationChain} from 'express-validator';

export const updateAdministratorJoinAsMemberValidationChain: ValidationChain[] = [
  body('administratorEmailToUpdate', 'Must be a valid email address')
      .exists()
      .isEmail(),
];
