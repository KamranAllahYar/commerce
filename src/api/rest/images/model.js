const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../../services/database');

class Image extends Model {
}

Image.init({
  // Model attributes are defined here
  model_id: {
    type: DataTypes.INTEGER,
    index: true,
    allowNull: false,
  },
  model_type: {
    type: DataTypes.INTEGER,
    index: true,
    allowNull: false,
  },
  media_id: {
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
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Image', // We need to choose the model name
  tableName: 'images',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Image;
