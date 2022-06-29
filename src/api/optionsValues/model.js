const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');
const Option = require('../options/model');

class OptionValues extends Model {
}

OptionValues.init({
  // Model attributes are defined here
  optionId: {
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
  underscored: true,
  modelName: 'option_values', // We need to choose the model name
  tableName: 'option_values',
});
OptionValues.belongsTo(Option);
module.exports = OptionValues;
