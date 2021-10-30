const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../../services/database');
const Option = require('../options/model');

class OptionValues extends Model {
}

OptionValues.init({
  // Model attributes are defined here
  option_id: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: Option,
      key: 'id',
    },
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    index: true,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'OptionValues', // We need to choose the model name
  tableName: 'option_values',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = OptionValues;
