const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../../services/database');

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
  meta_title: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  meta_description: {
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
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Category', // We need to choose the model name
  tableName: 'categories',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Category;
