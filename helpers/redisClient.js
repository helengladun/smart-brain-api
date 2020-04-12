const redis = require('redis');

// setup Redis
const redisClient = redis.createClient({host: 'redis'});

module.exports = {
  redisClient
};