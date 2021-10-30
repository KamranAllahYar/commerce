require('dotenv').config();
require('./src/lib/globals');
const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const routesSetup = require('./src/routes');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Redis Setup
const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
})
redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.REDIS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // if true only transmit cookie over https
    httpOnly: false, // if true prevent client side JS from reading the cookie
    maxAge: 1000 * 60 * 10 // session max age in miliseconds
  }
}))
//Redis Setup
routesSetup(app);

const sequelize = require('./services/database');
sequelize.authenticate().then().catch(console.error);
require('./src/models');
sequelize.sync().then();
module.exports = app;
