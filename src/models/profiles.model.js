const mongoose = require('mongoose');

const validators = require('../helpers/validators');

module.exports = function (app) {
  const modelName = 'profiles';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true
    },
    profilePicture: {
      type: String,
      validate: {
        validator: validators.isUrl,
        message: 'invalid profile picture url'
      }
    },
    uid: {
      type: String,
      unique: true,
      validate: {
        validator: validators.isUuid,
        message: 'invalid uuid'
      }
    },
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true,
      validate: {
        validator: validators.isEmail,
        message: 'invalid email'
      }
    },
    locale: {
      type: String
    },
    address: {
      type: String,
      minlength: 5,
      trim: true
    },
    bio: {
      type: String,
      minglength: 3,
      trim: true
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
