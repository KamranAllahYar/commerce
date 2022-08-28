const sequelize = require('../database');

const connectSequelize = require('connect-session-sequelize');
module.exports = function( session ) {
  const SequelizeStore = connectSequelize(session.Store);
  return new SequelizeStore({
    db: sequelize,
  });
};

