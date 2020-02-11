const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  const _db = app.get('mongodb');
  const mongo_uri = `mongodb://${_db.host}:${_db.port}/${_db.dbname}`;
  mongoose.connect(
    mongo_uri,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
