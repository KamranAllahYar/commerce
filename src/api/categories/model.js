const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');

class Category extends Model {
}

Category.init({
  // Model attributes are defined here
  parent: {
    type: DataTypes.INTEGER,
    index: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    index: true,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    index: true,
    unique: true,
    allowNull: false,
  },
  metaTitle: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  metaDescription: {
    type: DataTypes.STRING,
    defaultValue: null,
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
  modelName: 'Category', // We need to choose the model name
  tableName: 'categories',
});

module.exports = Category;
