const Base = require('../base');
const { Op } = require('sequelize');

module.exports = class ProductOptionController extends Base {
  OPTION_MODEl = null;
  PRODUCT_MODEl = null;

  constructor ( model, productModel, optionModel ) {
    super();
    this.MODEL = model;
    this.PRODUCT_MODEl = productModel;
    this.OPTION_MODEl = optionModel;
  }

  async beforeCreate ( req, res, next ) {
    const productExists = await this.PRODUCT_MODEl.findByPk(req.body.product_id);
    if ( !productExists ) {
      return this.NOT_FOUND(res, 'Invalid product id');
    }
    const optionExists = await this.OPTION_MODEl.findByPk(req.body.option_id);
    if ( !optionExists ) {
      return this.NOT_FOUND(res, 'Invalid option id');
    }
    const exists = await this.MODEL.findOne({
      where: {
        product_id: {
          [Op.eq]: req.body.product_id,
        },
        option_id: {
          [Op.eq]: req.body.option_id,
        },
      },
    });
    if ( exists ) {
      return this.CONFLICTS(res, 'Product option already exists');
    }
    req.payload = req.body;
    return next();
  }

  async beforeUpdate ( req, res, next ) {
    const productExists = await this.PRODUCT_MODEl.findByPk(req.body.product_id);
    if ( !productExists ) {
      return this.NOT_FOUND(res, 'Invalid product id');
    }
    const optionExists = await this.OPTION_MODEl.findByPk(req.body.option_id);
    if ( !optionExists ) {
      return this.NOT_FOUND(res, 'Invalid option id');
    }
    const exists = await this.MODEL.findByPk(req.params.id);
    if ( !exists ) {
      return this.NOT_FOUND(res, 'Record Not Found');
    }
    const conflicts = await this.MODEL.findOne({
      where: {
        option_id: {
          [Op.eq]: req.body.option_id,
        },
        product_id: {
          [Op.eq]: req.body.product_id,
        },
      },
    });
    if ( conflicts ) {
      return this.CONFLICTS(res, 'Product option already exists');
    }
    req.payload = req.body;
    next();
  }
};
