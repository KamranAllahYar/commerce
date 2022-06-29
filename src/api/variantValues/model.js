const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../services/database');
const Option = require('../options/model');
const ProductVariant = require('../productVariants/model');
const OptionValue = require('../optionsValues/model');

class VariantValue extends Model {
}

VariantValue.init({
  // Model attributes are defined here
  optionId: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: Option,
      key: 'id',
    },
    allowNull: false,
  },
  variantId: {
    type: DataTypes.INTEGER,
    index: true,
    references: {
      model: ProductVariant,
      key: 'id',
    },
    allowNull: false,
  },
  valueId: {
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
  underscored: true,
  sequelize, // We need to pass the connection instance
  modelName: 'variant_values', // We need to choose the model name
  tableName: 'variant_values',

});

module.exports = VariantValue;
