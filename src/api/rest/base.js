const config = require('../../../config/config.json');
const { Op } = require('sequelize');
const CacheService = require('../../../services/cache');
const ttl = 60 * 60; // cache for 1 Hour
const slugify = require('slugify');
const { queryBuilder } = require('../../lib/helpers');
module.exports = class Base {
  MODEL;
  CACHE = new CacheService(ttl);

  validateRequest ( params, requiredFields ) {
    let validator = [];
    for ( let field of requiredFields ) {
      if ( !params[field.name] ) {
        validator.push({
          fieldName: field.name,
          message: field.message ? field.message : field.name +
              ' field is required!',
        });
      }
    }
    return validator;
  }

  toJSON ( payload ) {
    return JSON.parse(JSON.stringify(payload));
  }

  async beforeFind ( req, res, next ) {
    // console.log(req.query);
    return next();
  }

  async find ( req, res, next ) {
    req.session.test = 'hi';
    try {
      let query = req.query;
      const pageSize = parseInt(req.query.pageSize) || 15;
      const page = parseInt(req.query.page) || 0;
      query = queryBuilder(query);
      query = { ...query, ...this.paginate(page, pageSize) };
      console.log(query);
      req.results = await this.MODEL.findAndCountAll(query);
      return next();
    }
    catch ( e ) {
      return res.status(this.SERVER_ERROR).send(e);
    }

  }

  async afterFind ( req, res ) {
    return res.send(req.results);
  }

  async beforeGet ( req, res, next ) {
    return next();
  }

  async get ( req, res, next ) {
    req.results = await this.MODEL.findByPk(req.params.id);
    return next();
  }

  async afterGet ( req, res ) {
    return res.send(req.results);
  }

  async beforeCreate ( req, res, next ) {
    return next();
  }

  async create ( req, res, next ) {
    req.results = await this.MODEL.create(req.payload);
    return next();
  }

  async afterCreate ( req, res ) {
    return res.send(req.results);
  }

  async beforeUpdate ( req, res, next ) {
    return next();
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
    req.results = {
      status: true,
      message: 'Record Updated',
      data: updatedResult,
    };
    return next();
  }

  async afterUpdate ( req, res ) {
    return res.send(req.results);
  }

  async beforeDestroy ( req, res, next ) {
    return next();
  }

  async destroy ( req, res, next ) {
    const result = await this.MODEL.findByPk(req.params.id);
    if ( !result ) {
      req.results = {
        status: false,
        message: 'Record Not Found',
      };
      return next();
    }
    await result.destroy();
    req.results = {
      status: true,
      message: 'Record Deleted',
      data: result,
    };
    return next();
  }

  async afterDestroy ( req, res ) {
    return res.send(req.results);
  }

  paginate ( page = 1, pageSize = 15 ) {
    const offset = ( ( page <= 0 ? 1 : page ) - 1 ) * pageSize;
    return {
      offset: offset || config.queryOptions.offset,
      limit: pageSize || config.queryOptions.limit,
    };
  }

  async generateSlug ( string ) {
    let slug = slugify(string);
    const exists = await this.MODEL.findOne({
      where: {
        slug: {
          [Op.like]: slug,
        },
      },
    });
    if ( exists ) {
      const product = await this.MODEL.findOne({
        attributes: ['id'],
        order: [
          ['id', 'DESC'],
        ],
      });
      slug = slugify(string + '-' + ( product.id + 1 ));
    }
    return slug;
  }
};