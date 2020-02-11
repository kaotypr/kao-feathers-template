/* eslint-disable no-console */
require('dotenv').config();

// use secureEnv to protect .env file
// let secureEnv = require('secure-env');
// global.env = secureEnv({secret:'mySecretPassword'});

const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const db = app.get('mongodb');
const db_host = db.host;
const db_port = db.port;
const db_name = db.dbname;
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Kao feathers template use mongodb on mongodb://%s:%d/%s', db_host, db_port, db_name),
logger.info('Kao feathers template started on http://%s:%d', app.get('host'), port)
);
