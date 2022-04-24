const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');
const Product = require('../products/model');
const Category = require('../categories/model');

class ProductCategory extends Model {
}

ProductCategory.init({
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
  category_id: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'ProductCategory', // We need to choose the model name
  tableName: 'product_categories',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = ProductCategory;
