const uuid = require('uuid');

const setUuid = async context => {
  context.data.uid = uuid.v4();
  return context;
};

module.exports = setUuid;
