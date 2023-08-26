import util from 'util';
import app from './app';
import SafeMongooseConnection from './lib/safe-mongoose-connection';
import logger from './logger';
import {environment} from './environment';

const PORT = environment.PORT || 3000;

let debugCallback;
if (environment.NODE_ENV === 'development') {
  debugCallback = (collectionName: string, method: string, query: any, doc: string): void => {
    const message = `${collectionName}.${method}(${util.inspect(query, {colors: true, depth: null})})`;
    logger.log({
      level: 'verbose',
      message,
      consoleLoggerOptions: {label: 'MONGO'},
    });
  };
}

const safeMongooseConnection = new SafeMongooseConnection({
  mongoUrl: environment.MONGO_URL ?? '',
  debugCallback,
  onStartConnection: (mongoUrl) => logger.info(`Connecting to MongoDB at ${mongoUrl}`),
  onConnectionError: (error, mongoUrl) => logger.log({
    level: 'error',
    message: `Could not connect to MongoDB at ${mongoUrl}`,
    error,
  }),
  onConnectionRetry: (mongoUrl) => logger.info(`Retrying to MongoDB at ${mongoUrl}`),
});

const serve = () => app.listen(PORT, () => {
  logger.info(`🌏 Express server started at http://localhost:${PORT}`);
});

if (environment.MONGO_URL == null) {
  logger.error(
      'MONGO_URL not specified in environment',
      new Error('MONGO_URL not specified in environment'),
  );
  process.exit(1);
} else {
  safeMongooseConnection.connect((mongoUrl) => {
    logger.info(`Connected to MongoDB at ${mongoUrl}`);
    serve();
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', async () => {
  console.log('\n'); /* eslint-disable-line */
  logger.info('Gracefully shutting down');
  logger.info('Closing the MongoDB connection');
  try {
    await safeMongooseConnection.close(true);
    logger.info('Mongo connection closed successfully');
  } catch (err) {
    logger.log({
      level: 'error',
      message: 'Error shutting closing mongo connection',
      error: err,
    });
  }
  process.exit(0);
});
