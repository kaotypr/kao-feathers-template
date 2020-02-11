const crypto = require('crypto');

const gravatarUrl = 'https://s.gravatar.com/avatar';
const size = 80;

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function () {
  return async context => {
    let { email, googleId, google } = context.data;

    if (email === undefined && googleId) {
      const gpemail = google.profile._json.email;
      const hash = crypto.createHash('md5').update(gpemail.toLowerCase()).digest('hex');
      context.data.avatar = `${gravatarUrl}/${hash}?s=${size}`;
    }

    if (email) {
      const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
      context.data.avatar = `${gravatarUrl}/${hash}?${size}`;
    }

    return context;
  };
};
