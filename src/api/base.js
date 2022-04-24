const config = require('../../config/config.json');
const { Op } = require('sequelize');
const CacheService = require('../../services/cache');
const ttl = 60 * 60; // cache for 1 Hour
const slugify = require('slugify');
const { queryBuilder } = require('../lib/helpers');
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

  async find ( req, res ) {
    try {
      let query = req.query;
      const pageSize = parseInt(req.query.pageSize) || 15;
      const page = parseInt(req.query.page) || 0;
      query = queryBuilder(query);
      query = { ...query, ...this.paginate(page, pageSize) };
      const results = await this.MODEL.findAndCountAll(query);
      return res.send({
        pageSize,
        page, ...results,
      });
    }
    catch ( e ) {
      return res.status(SERVER_ERROR).send({
        status: false, message: e.toString(),
      });
    }
  }
  async get ( req, res ) {
    const results = await this.MODEL.findByPk(req.params.id);
    return res.send(results);
  }

  async create ( req, res ) {
    const results = await this.MODEL.create(req.body);
    return res.send(results);
  }

  async update ( req, res ) {
    const result = await this.MODEL.findByPk(req.params.id);
    if ( !result ) {
      return res.status(NOT_FOUND).send({
        status: false, message: 'Record Not Found',
      });
    }
    const updatedResult = await result.update(req.body);
    return res.send({
      status: true,
      message: 'Record Updated',
      data: updatedResult,
    });
  }

  async destroy ( req, res ) {
    const result = await this.MODEL.findByPk(req.params.id);
    if ( !result ) {
      return res.status(NOT_FOUND).send({
        status: false,
        message: 'Record Not Found',
      });
    }
    await result.destroy();
    return res.send({
      status: true,
      message: 'Record Deleted',
      data: result,
    });
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
