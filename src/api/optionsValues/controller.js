const Base = require('../base');
const { Op } = require('sequelize');
const { queryBuilder } = require('../../lib/helpers');

module.exports = class OptionController extends Base {
  OPTION_MODEl = null;

  constructor ( model, optionModel ) {
    super();
    this.MODEL = model;
    this.OPTION_MODEl = optionModel;
  }

  async find ( req, res ) {
    try {
      let query = req.query;
      const pageSize = parseInt(req.query.pageSize) || 15;
      const page = parseInt(req.query.page) || 0;
      query = queryBuilder(query);
      query = {
        ...query, ...this.paginate(page, pageSize), include: {
          model: this.OPTION_MODEl, attributes: ['name'],
        }, order: [
          [this.OPTION_MODEl, 'name', 'ASC'],
          ['value', 'ASC'],
        ],
      };
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

  async create ( req, res ) {
    try {
      const optionExists = await this.OPTION_MODEl.findByPk(req.body.option_id);
      if ( !optionExists ) {
        return res.status(NOT_FOUND).send({
          status: false, message: 'Invalid option id',
        });
      }
      const exists = await this.MODEL.findOne({
        where: {
          value: {
            [Op.eq]: req.body.value,
          },
          option_id: {
            [Op.eq]: req.body.option_id,
          },
        },
      });
      if ( exists ) {
        return res.status(CONFLICTS).send({
          status: false, message: 'Value already exists',
        });
      }
      const results = await this.MODEL.create(req.body);
      return res.send(results);
    }
    catch ( e ) {
      return res.status(SERVER_ERROR).send({
        status: false, message: e.toString(),
      });
    }

  }

  async update ( req, res, next ) {
    try {
      const result = await this.MODEL.findByPk(req.params.id);
      if ( !result ) {
        return this.NOT_FOUND(res, 'Record Not Found');
      }
      const optionExists = await this.OPTION_MODEl.findByPk(req.body.option_id);
      if ( !optionExists ) {
        return res.status(NOT_FOUND).send({
          status: false, message: 'Invalid option id',
        });
      }
      const conflicts = await this.MODEL.findOne({
        where: {
          option_id: {
            [Op.eq]: req.body.option_id,
          },
          value: {
            [Op.eq]: req.body.value,
          },
        },
      });
      if ( conflicts ) {
        return res.status(CONFLICTS).send({
          status: false, message: 'Option Value already exists',
        });
      }
      const data = await result.update(req.body);
      return res.send({
        status: true,
        message: 'Record Updated',
        data,
      });
    }
    catch ( e ) {
      return res.status(SERVER_ERROR).send({
        status: false, message: e.toString(),
      });
    }

  }

};
