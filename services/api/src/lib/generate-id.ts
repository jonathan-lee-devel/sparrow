import winston from 'winston';
import crypto from 'crypto';
import logger from '../logger';

export type GenerateIdFunction = (idLength: number) => Promise<string>;

export const makeGenerateId = (
    logger: winston.Logger,
): GenerateIdFunction => {
  return async function generateId(idLength): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      crypto.randomBytes(idLength / 2, (err, buffer) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        return resolve(buffer.toString('hex'));
      });
    });
  };
};

export const generateId = makeGenerateId(logger);
