const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const commonHooks = require('feathers-hooks-common');
const { setField } = require('feathers-authentication-hooks');
const { softDelete } = require('feathers-hooks-common');

const setProfilePicture = require('../../hooks/set-profile-picture');
const { setVerifyToken } = require('../../hooks/set-verify-token');

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query._id'
});

const setProfile = async context => {
  const app = context.app;
  let { data, result } = context;

  if (data && result) {
    data.userId = result._id;
    app.service('profiles').create(data);
  }

  return context;
};


module.exports = {
  before: {
    all: [
      softDelete()
    ],
    find: [
      authenticate('jwt'),
    ],
    get: [
      authenticate('jwt'),
    ],
    create: [
      hashPassword('password'),
      setProfilePicture,
      setVerifyToken,
    ],
    update: [
      authenticate('jwt'),
      limitToUser,
      hashPassword('password'),
    ],
    patch: [
      authenticate('jwt'),
      limitToUser,
      hashPassword('password'),
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(
          true,
          [ 'email',
            'verified',
            'verifyToken',
            'verifyExpires',
            'verifyChanges',
            'resetToken',
            'resetShortToken',
            'resetExpires'
          ]
        )
      ),
      hashPassword('password')
    ],
    remove: [
      authenticate('jwt'),
      limitToUser,
      commonHooks.disallow('external'),
    ]
  },
  after: {
    all: [],
    find: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect(
        '_id',
        'password',
        'verifyExpires',
        'verifyToken',
      ),
    ],
    get: [
      protect(
        '_id',
        'password',
        'verifyExpires',
        'verifyToken',
      ),
    ],
    create: [
      setProfile,
      protect(
        '_id',
        'password',
        'verifyExpires',
        'verifyToken',
      ),
    ],
    update: [
      protect(
        '_id',
        'password',
        'verifyExpires',
        'verifyToken',
      ),
    ],
    patch: [
      protect(
        '_id',
        'password',
        'verifyExpires',
        'verifyToken',
      ),
    ],
    remove: [
      protect(
        '_id',
        'password',
        'verifyExpires',
        'verifyToken',
      ),
    ]
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
