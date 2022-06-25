const Base = require('../base');
const { Op } = require('sequelize');
const { queryBuilder } = require('../../lib/helpers');

module.exports = class ProductOptionController extends Base {
  OPTION_MODEl = null;
  PRODUCT_MODEl = null;

  constructor(model, productModel, optionModel) {
    super();
    this.MODEL = model;
    this.PRODUCT_MODEl = productModel;
    this.OPTION_MODEl = optionModel;
  }

  async find(req, res) {
    try {
      let query = req.query;
      const pageSize = parseInt(req.query.pageSize) || 15;
      const page = parseInt(req.query.page) || 0;
      query = queryBuilder(query);
      query = { ...query, ...this.paginate(page, pageSize), include: { model: this.OPTION_MODEl, attributes: [['name','test']] }, raw: false };
      const results = await this.MODEL.findAndCountAll(query);
      return res.send({
        pageSize,
        page, ...results,
      });
    }
    catch (e) {
      return res.status(SERVER_ERROR).send({
        status: false, message: e.toString(),
      });
    }
  }

  async create(req, res, next) {
    try {
      const productExists = await this.PRODUCT_MODEl.findByPk(req.body.product_id);
      if (!productExists) {
        return res.status(NOT_FOUND).send({
          status: false, message: 'Invalid product id',
        });
      }
      const optionExists = await this.OPTION_MODEl.findByPk(req.body.option_id);
      if (!optionExists) {
        return res.status(NOT_FOUND).send({
          status: false, message: 'Invalid option id',
        });
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
      if (exists) {
        return res.status(CONFLICTS).send({
          status: false, message: 'Product option already exists',
        });
      }
      const results = await this.MODEL.create(req.body);
      return res.send(results);
    }
    catch (e) {
      return res.status(SERVER_ERROR).send({
        status: false, message: e.toString(),
      });
    }
  }

  async update(req, res) {
    const productExists = await this.PRODUCT_MODEl.findByPk(req.body.product_id);
    if (!productExists) {
      return res.status(NOT_FOUND).send({
        status: false, message: 'Invalid product id',
      });
    }
    const optionExists = await this.OPTION_MODEl.findByPk(req.body.option_id);
    if (!optionExists) {
      return res.status(NOT_FOUND).send({
        status: false, message: 'Invalid option id',
      });
    }
    const result = await this.MODEL.findByPk(req.params.id);
    if (!result) {
      return res.status(NOT_FOUND).send({
        status: false, message: 'Record Not Found',
      });
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
    if (conflicts) {
      return res.status(CONFLICTS).send({
        status: false, message: 'Product option already exists',
      });
    }
    const data = await result.update(req.body);
    return res.send({
      status: true,
      message: 'Record Updated',
      data,
    });
  }
};
