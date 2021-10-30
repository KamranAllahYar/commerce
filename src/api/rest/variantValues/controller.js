const Base = require('../base');
const { Op } = require('sequelize');

module.exports = class OptionController extends Base {
  VARIANTS_MODEL;
  OPTIONS_MODEL;
  constructor ( model, variantModel, OptionModel ) {
    super();
    this.MODEL = model;
    this.VARIANTS_MODEL = variantModel;
    this.OPTIONS_MODEL = OptionModel;
  }

  async beforeCreate ( req, res, next ) {
    const variantExists = await this.VARIANTS_MODEL.findByPk(req.body.variant_id);
    if ( !variantExists ) {
      return this.NOT_FOUND(res, 'Invalid variant id');
    }
    const optionExists = await this.OPTIONS_MODEL.findByPk(req.body.option_id);
    if ( !optionExists ) {
      return this.NOT_FOUND(res, 'Invalid option id');
    }
    req.payload = req.body;
    next();
  }

  async beforeUpdate ( req, res, next ) {
    const exists = await this.MODEL.findByPk(req.params.id);
    if ( !exists ) {
      return this.NOT_FOUND(res, 'Record Not Found');
    }
    if ( req.body.variant_id && exists.variant_id !== req.body.variant_id ) {
      const variantExists = await this.VARIANTS_MODEL.findByPk(req.body.variant_id);
      if ( !variantExists ) {
        return this.NOT_FOUND(res, 'Invalid variant id');
      }
    }
    if ( req.body.option_id && exists.option_id !== req.body.option_id ) {
      const optionExists = await this.OPTIONS_MODEL.findByPk(req.body.option_id);
      if ( !optionExists ) {
        return this.NOT_FOUND(res, 'Invalid option id');
      }
    }
    req.payload = req.body;
    next();
  }
};
