const jwt = require('jsonwebtoken');
const redisClient = require('../helpers/redisClient').redisClient;

const signToken = (email, id) => {
  const jwtPayload = {email, id};
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days'});
};

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
};

const createSession = (user) => {
  // JWN token, return user data
  const {email, id} = user;
  const token = signToken(email, id);
  return setToken(token, id)
    .then(() => ({ success: 'true', userId: id, token}))
    .catch(console.log);
};

module.exports = {
  createSession
};