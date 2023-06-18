import mongoose from 'mongoose';

const {model, Schema} = mongoose;

/**
 * Model used to represent a logged-in user.zs
 */
export interface User {
    email: string;
    firstName: string | undefined;
    lastName: string | undefined;
    password: string | undefined;
    emailVerified: boolean;
    googleId: string | undefined;
}

const schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
    unique: false,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    unique: false,
  },
  googleId: {
    type: String,
    required: false,
    unique: true,
  },
});

export const UserModel = model<User>('User', schema);
