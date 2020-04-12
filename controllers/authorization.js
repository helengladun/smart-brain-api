const redisClient = require('../helpers/redisClient').redisClient;

const requireAuth = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization) {
    return res.status(401).json('Unauthorized');
  }
  const token = authorization.replace('Bearer ', '');
  return redisClient.get(token, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json('Unauthorized')
    }
    console.log('you shall pass');
    return next()
  })
};

module.exports = {
  requireAuth
};