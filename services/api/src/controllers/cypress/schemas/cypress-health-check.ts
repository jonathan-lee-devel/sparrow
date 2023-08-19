import {z} from 'zod';

export const CypressHealthCheckRequestBodySchema = z.object({});

export type CypressHealthCheckRequestBody = z.infer<typeof CypressHealthCheckRequestBodySchema>;

export const CypressHealthCheckRequestQuerySchema = z.object({});

export type CypressHealthCheckRequestQuery = z.infer<typeof CypressHealthCheckRequestQuerySchema>;
