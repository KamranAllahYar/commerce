const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');

class Media extends Model {
}

Media.init({
  // Model attributes are defined here
  file_name: {
    type: DataTypes.STRING,
    index: true,
    allowNull: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Media', // We need to choose the model name
  tableName: 'media',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Media;
