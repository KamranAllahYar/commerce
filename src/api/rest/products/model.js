const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../../services/database');

class Product extends Model {
}

Product.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    index: true,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    index: true,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    index: true,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    index: true,
    allowNull: false,
  },
  type: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    index: true,
    allowNull: false,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Product', // We need to choose the model name
  tableName: 'products',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Product;
