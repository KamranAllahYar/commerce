const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');

class Option extends Model {
}

Option.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    unique: true,
    index: true,
    allowNull: false,
  },
}, {
  // Other model options go here
  underscored: true,
  sequelize, // We need to pass the connection instance
  modelName: 'options', // We need to choose the model name
  tableName: 'options',
});

module.exports = Option;
