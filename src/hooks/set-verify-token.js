const crypto = require('crypto');

const { isEmail } = require('../helpers/validators');

const createToken = ({
  identifier,
  time = new Date().getTime(),
}) => {
  if (isEmail(identifier)) {
    return crypto.createHash('md5').update(`${identifier}/${time}`).digest('hex');
  }
  return Math.floor(100000 + Math.random() * 900000);
};

const setVerifyToken = async context => {
  const { phone, email, googleId } = context.data;
  // verification code only generated if context data has a phone number or email and NOT LOGIN by oAuth
  if (!googleId && (phone || email)) {
    const dt = new Date();
    const verifyToken = createToken({
      identifier: email || phone,
      time: dt.getTime(),
    });
    context.data.verifyToken = verifyToken;
    context.data.verifyExpires = dt.setHours(dt.getHours() + 1);
  }
  return context;
};

module.exports = {
  setVerifyToken,
  createToken
};
