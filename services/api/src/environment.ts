import dotenv from 'dotenv';
import {z} from 'zod';

const result = dotenv.config();
if (result.error) {
  dotenv.config({path: '.env.default'});
}

const environmentVariables = z.object({
  NODE_ENV: z.string(),
  PORT: z.string(),
  MONGO_URL: z.string(),
  SESSION_SECRET: z.string(),
  FRONT_END_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
});

export const environment = environmentVariables.parse(process.env);
