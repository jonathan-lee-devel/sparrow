import {makeMakeLoginEndpoint} from './endpoints/login';
import {returnAnonymouslyBasedOnSafeParseResult} from '../../lib/endpoint-util';
import {LoginRequestBodySchema, LoginRequestQuerySchema} from './schemas/login';
import {makeLoginCallback} from './callbacks/login';
import logger from '../../logger';
import {UserModel} from '../../models/users/User';

export const loginHandler = makeMakeLoginEndpoint(returnAnonymouslyBasedOnSafeParseResult)(
    LoginRequestBodySchema,
    LoginRequestQuerySchema,
    makeLoginCallback(logger, UserModel),
);
