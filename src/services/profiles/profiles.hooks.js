const { authenticate } = require('@feathersjs/authentication').hooks;
const { softDelete } = require('feathers-hooks-common');
const commonHooks = require('feathers-hooks-common');
const { setField } = require('feathers-authentication-hooks');

const setUuid = require('../../hooks/set-uuid');

const limitToUser = setField({
  from: 'params.user.uid',
  as: 'params.query.uid'
});

module.exports = {
  before: {
    all: [
      softDelete(),
    ],
    find: [],
    get: [],
    create: [
      commonHooks.disallow('external'),
      authenticate('jwt'),
      setUuid,
    ],
    update: [
      authenticate('jwt'),
      limitToUser
    ],
    patch: [
      authenticate('jwt'),
      limitToUser,
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(
          true,
          [
            'uid',
            'userId',
          ]
        )
      ),
    ],
    remove: [
      authenticate('jwt'),
      limitToUser
    ]
  },

  after: {
    all: [],
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
