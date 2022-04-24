const {
  DataTypes,
  Model,
} = require('sequelize');
const sequelize = require('../../../services/database');

class User extends Model {
}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
    index: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'users',
  indexes: [{ fields: ['lastName'] }],
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;
