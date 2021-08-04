const crypto = require('crypto');

const secret = crypto.randomBytes(256);
module.exports = secret;
