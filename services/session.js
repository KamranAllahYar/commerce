const session = require('express-session');
const mysqlSession = require('./sqlSession');
const redisSession = require('./redisSession');

module.exports = function( app ) {
  let store = null;
  if ( process.env.SESSION_STORAGE === 'mysql' ) {
    store = mysqlSession(session);
  }
  else if ( process.env.SESSION_STORAGE === 'redis' ) {
    store = redisSession(session);
  }
  console.log(process.env.SESSION_STORAGE);
  app.use(session({
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
