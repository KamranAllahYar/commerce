const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../../services/database');
const Option = require('../../rest/options/model');
const ProductVariant = require('../../rest/productVariants/model');
const OptionValue = require('../../rest/optionsValues/model');

class VariantValue extends Model {
}

VariantValue.init({
  // Model attributes are defined here
  option_id: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: Option,
      key: 'id',
    },
    allowNull: false,
  },
  variant_id: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: ProductVariant,
      key: 'id',
    },
    allowNull: false,
  },
  value_id: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: OptionValue,
      key: 'id',
    },
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    index: true,
    allowNull: false,
  },
  mrp: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
    index: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
    index: true,
    allowNull: false,
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
  modelName: 'VariantValue', // We need to choose the model name
  tableName: 'variant_values',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = VariantValue;
