const Base = require('../base');
const { Op } = require('sequelize');

module.exports = class ProductVariantController extends Base {
  PRODUCT_MODEl;

  constructor ( model, productModel ) {
    super();
    this.MODEL = model;
    this.PRODUCT_MODEl = productModel;
  }

  async beforeCreate ( req, res, next ) {
    const productExists = await this.PRODUCT_MODEl.findByPk(req.body.product_id);
    if ( !productExists ) {
      return this.NOT_FOUND(res, 'Invalid product id');
    }
    const skuExists = await this.MODEL.findOne({
      where: {
        sku: {
          [Op.like]: req.body.sku,
        },
      },
    });
    if ( skuExists ) {
      return this.CONFLICTS(res, 'Variant Sku already exists');
    }
    req.payload = req.body
    next();
  }
  async beforeUpdate ( req, res, next ) {
    const exists = await this.MODEL.findByPk(req.params.id);
    if ( !exists ) {
      return this.NOT_FOUND(res, 'Record Not Found');
    }
    if ( req.body.product_id && exists.product_id !== req.body.product_id ) {
      const productExists = await this.PRODUCT_MODEl.findByPk(req.body.product_id);
      if ( !productExists ) {
        return this.NOT_FOUND(res, 'Invalid product id');
      }
    }
    if ( req.body.sku && exists.sku !== req.body.sku ) {
      const exists = await this.MODEL.findOne({
        where: {
          sku: {
            [Op.like]: req.body.sku,
          },
        },
      });
      if ( exists ) {
        return this.CONFLICTS(res, 'Sku already exists.');
      }
    }
    req.payload = req.body;
    next();
  }

};
