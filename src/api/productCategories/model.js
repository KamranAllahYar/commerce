const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');
const Product = require('../products/model');
const Category = require('../categories/model');

class ProductCategory extends Model {
}

ProductCategory.init({
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
  categoryId: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  underscored: true,
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'product_category', // We need to choose the model name
  tableName: 'product_categories',
});

module.exports = ProductCategory;
