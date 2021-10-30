const Base = require('../base');
const { Op } = require('sequelize');

module.exports = class OptionController extends Base {
  OPTION_MODEl = null;

  constructor ( model, optionModel ) {
    super();
    this.MODEL = model;
    this.OPTION_MODEl = optionModel;
  }

  async beforeCreate ( req, res, next ) {
    const optionExists = await this.OPTION_MODEl.findByPk(req.body.option_id);
    if ( !optionExists ) {
      return this.NOT_FOUND(res, 'Invalid option id');
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
      return this.CONFLICTS(res, 'Value already exists');
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
        option_id: {
          [Op.eq]: req.body.option_id,
        },
        value: {
          [Op.eq]: req.body.value,
        },
      },
    });
    if ( conflicts ) {
      return this.CONFLICTS(res, 'Option Value already exists');
    }
    req.payload = req.body;
    next();
  }

};
