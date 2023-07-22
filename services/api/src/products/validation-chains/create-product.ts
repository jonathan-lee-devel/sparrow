import {body, ValidationChain} from 'express-validator';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length.js';

export const createProductValidationChain: ValidationChain[] = [
  body('name', 'Must be a valid name of 1-30 characters')
      .exists()
      .isLength({min: 1, max: 30}),
  body('organizationId', 'Must be a valid organization ID')
      .exists()
      .isLength({min: DEFAULT_ID_LENGTH, max: DEFAULT_ID_LENGTH}),
];
