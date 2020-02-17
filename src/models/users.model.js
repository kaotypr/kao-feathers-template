const validators = require('../helpers/validators');

module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
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
    phone: {
      type: String,
      unique: true,
      sparse: true
    },
    password: {
      type: String
    },
    language: {
      type: String,
      default: app.get('language').english
    },
    auth0Id: {
      type: String
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String
    },
    verifyExpires: {
      type: Date
    },
    verifyChanges: {
      type: Object
    },
    resetToken: {
      type: String
    },
    resetExpires: {
      type: Date
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
