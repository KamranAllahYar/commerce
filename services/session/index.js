const index = require('express-session');
const mysqlSession = require('./sql');
const redisSession = require('./redis');

module.exports = function( app ) {
  let store = null;
  switch (process.env.SESSION_STORAGE){
    case 'mysql':
      store = mysqlSession(index);
      break;
    case 'redis':
      store = redisSession(index);
      break;
    default:
      break;
  }
  console.log(process.env.SESSION_STORAGE);
  app.use(index({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
    },
  }));
};
