const connectRedis = require('connect-redis');
const redis = require('redis');

module.exports = function( session ) {

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
  redisClient.on('error', function( err ) {
    console.log('Could not establish a connection with redis. ' + err);
  });
  redisClient.on('connect', function( err ) {
    console.log('Connected to redis successfully');
  });
  return new RedisStore({ client: redisClient });
};
