const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const commonHooks = require('feathers-hooks-common');
const { setField } = require('feathers-authentication-hooks');
const { softDelete } = require('feathers-hooks-common');

const useUuid = require('../../hooks/use-uuid');
const gravatar = require('../../hooks/gravatar');

const limitToUser = setField({
  from: 'params.user.uid',
  as: 'params.query.uid'
});

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
      useUuid(),
      gravatar()
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
    ],
    remove: [
      authenticate('jwt'),
      limitToUser,
      commonHooks.disallow('external'),
    ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect(
        '_id',
        'password',
        'verifyExpires',
        'verifyToken',
      ),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
