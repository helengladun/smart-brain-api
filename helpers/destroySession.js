const redisClient = require('../helpers/redisClient').redisClient;

const removeToken = (key) => {
  return Promise.resolve(redisClient.del(key));
};

const destroySession = (token) => {
  return removeToken(token)
    .then(() => ({ success: 'true' }))
    .catch(console.log);
};

module.exports = {
  destroySession
};