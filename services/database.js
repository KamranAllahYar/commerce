const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTOR,
  logging: ( result ) => {
    console.log(result);
  },

});
module.exports = sequelize;
