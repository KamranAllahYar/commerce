const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');

class Media extends Model {
}

Media.init({
  // Model attributes are defined here
  fileName: {
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
  underscored: true,
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Media', // We need to choose the model name
  tableName: 'media',
});

module.exports = Media;
