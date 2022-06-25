const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');
const Product = require('../products/model');
const Option = require('../options/model');

class ProductOptions extends Model {
}

ProductOptions.init({
  // Model attributes are defined here
  product_id: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  option_id: {
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
  sequelize, // We need to pass the connection instance
  modelName: 'product_options', // We need to choose the model name
  tableName: 'product_options',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});
ProductOptions.belongsTo(Option,{foreignKey:'option_id'});
module.exports = ProductOptions;
