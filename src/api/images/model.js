const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');

class Image extends Model {
}

Image.init({
  // Model attributes are defined here
  modelId: {
    type: DataTypes.INTEGER,
    index: true,
    allowNull: false,
  },
  modelType: {
    type: DataTypes.INTEGER,
    index: true,
    allowNull: false,
  },
  mediaId: {
    type: DataTypes.INTEGER,
    index: true,
    allowNull: false,
  },
  index: {
    type: DataTypes.TINYINT,
    index: true,
    defaultValue: 1,
    allowNull: false,
  },
}, {
  underscored: true,
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Image', // We need to choose the model name
  tableName: 'images',
});

module.exports = Image;
