const crypto = require('crypto');

const setProfilePicture = async context => {
  const gravatarUrl = 'https://s.gravatar.com/avatar';
  const size = 80;
  const { email, googleId, profilePicture } = context.data;

  if (googleId && profilePicture) {
    context.data.profilePicture = profilePicture;
  } else if (email) {
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    context.data.profilePicture = `${gravatarUrl}/${hash}?${size}`;
  }

  return context;
};

module.exports = setProfilePicture;
