const Base = require('../base');
const { Op } = require('sequelize');

module.exports = class ProductController extends Base {
  constructor ( model ) {
    super();
    this.MODEL = model;
  }

  async beforeCreate ( req, res, next ) {
    const exists = await this.MODEL.findOne({
      where: {
        sku: {
          [Op.like]: req.body.sku,
        },
      },
    });
    if ( exists ) {
      return this.CONFLICTS(res, 'Sku already exists. Sku must be unique');
    }
    if ( !req.body.slug ) {
      req.body.slug = await this.generateSlug(req.body.name);
    }
    else {
      req.body.slug = await this.generateSlug(req.body.slug);
    }
    req.payload = req.body;
    next();
  }

  async create ( req, res, next ) {
    res.send(await this.MODEL.create(req.payload));
  }

  async beforeUpdate ( req, res, next ) {
    const exists = await this.MODEL.findByPk(req.params.id);
    if ( !exists ) {
      return this.NOT_FOUND(res, 'Record Not Found');
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
        return res.status(CONFLICTS).send({
          status: false, message: 'Sku already exists. Sku must be unique',
        });
      }
    }
    if ( !req.body.slug ) {
      if ( !exists.slug && req.body.name !== exists.name ) {
        req.body.slug = await this.generateSlug(req.body.name);
      }
    }
    else {
      if ( req.body.slug !== exists.slug ) {
        req.body.slug = await this.generateSlug(req.body.slug);
      }
      else {
        delete req.body.slug;
      }
    }
    req.payload = req.body;
    next();
  }

  async update ( req, res, next ) {
    const result = await this.MODEL.findByPk(req.params.id);
    if ( !result ) {
      req.results = {
        status: false,
        message: 'Record Not Found',
      };
      return next();
    }
    const updatedResult = await result.update(req.payload);
    return res.send({
      status: true,
      message: 'Record Updated',
      data: updatedResult,
    });
  }
};
