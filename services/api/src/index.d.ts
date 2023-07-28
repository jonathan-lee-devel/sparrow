import { IUser } from './models/users/User';

declare module 'express' {
  export interface AuthenticatedRequest extends Request {
    user: IUser
  }
}
