const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');
const Product = require('../products/model');
const Option = require('../options/model');

class ProductOptions extends Model {
}

ProductOptions.init({
  // Model attributes are defined here
  productId: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  optionId: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: Option,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  // Other model options go here
  underscored: true,
  sequelize, // We need to pass the connection instance
  modelName: 'product_options', // We need to choose the model name
  tableName: 'product_options',
});
ProductOptions.belongsTo(Option,{foreignKey:'option_id'});
module.exports = ProductOptions;
