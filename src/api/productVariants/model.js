const {
  DataTypes,
  Model,
} = require('sequelize');
const sequelize = require('../../../services/database');
const Product = require('../products/model');

class ProductVariant extends Model {
}

ProductVariant.init({
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
  sku: {
    type: DataTypes.STRING,
    unique: true,
    index: true,
    allowNull: false,
  },
  mrp: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    index: true,
    allowNull: false,
  },
}, {
  underscored: true,
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'product_variant', // We need to choose the model name
  tableName: 'product_variants',
});

module.exports = ProductVariant;
