const redisClient = require('../helpers/redisClient').redisClient;

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  return redisClient.get(token, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json('Unauthorized')
    }
    return res.json({id: reply})
  })
};

module.exports = {
  getAuthTokenId
};