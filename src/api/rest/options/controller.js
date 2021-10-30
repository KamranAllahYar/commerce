const Base = require('../base');
const { Op } = require('sequelize');
module.exports = class OptionController extends Base {
  OPTION_MODEl = null;
  constructor ( model,optionModel ) {
    super();
    this.MODEL = model;
    this.OPTION_MODEl = optionModel;
  }

  async beforeCreate ( req, res, next ) {
    const exists = await this.MODEL.findOne({
      where: {
        name: {
          [Op.eq]: req.body.name,
        },
      },
    });
    if ( exists ) {
      return this.CONFLICTS(res, 'Name already exists. Name must be unique');
    }
    req.payload = req.body;
    return next();
  }

  async beforeUpdate ( req, res, next ) {
    const exists = await this.MODEL.findByPk(req.params.id);
    if ( !exists ) {
      return this.NOT_FOUND(res, 'Record Not Found');
    }
    const conflicts = await this.MODEL.findOne({
      where: {
        name: {
          [Op.eq]: req.body.name,
        },
      },
    });
    if ( conflicts ) {
      return this.CONFLICTS(res, 'Name already exists. Name must be unique');
    }
    req.payload = req.body;
    next();
  }

};
