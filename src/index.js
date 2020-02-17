/* eslint-disable no-console */
require('dotenv').config();

// use secureEnv to protect .env file
// let secureEnv = require('secure-env');
// global.env = secureEnv({secret:'mySecretPassword'});

const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const db = app.get('mongodb');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Kao feathers template use mongodb on %s', db.url),
logger.info('Kao feathers template started on http://%s:%d', app.get('host'), port)
);
