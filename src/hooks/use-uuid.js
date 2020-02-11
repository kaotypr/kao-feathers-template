// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const uuid = require('uuid');

module.exports = function () {
  return async context => {
    context.data.uid = uuid.v4();
    return context;
  };
};
