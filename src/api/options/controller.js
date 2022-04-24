const Base = require('../base');
const { Op } = require('sequelize');
module.exports = class OptionController extends Base {
  OPTION_MODEl = null;

  constructor ( model, optionModel ) {
    super();
    this.MODEL = model;
    this.OPTION_MODEl = optionModel;
  }

  async create ( req, res ) {
    const exists = await this.MODEL.findOne({
      where: {
        name: {
          [Op.eq]: req.body.name.toLowerCase(),
        },
      },
    });
    if ( exists ) {
      return res.status(CONFLICTS).send({
        status: false, message: 'Name already exists. Name must be unique',
      });
    }
    req.body.name = req.body.name.toLowerCase();
    const results = await this.MODEL.create(req.body);
    return res.send(results);
  }

  async update ( req, res, next ) {
    const result = await this.MODEL.findByPk(req.params.id);
    if ( !result ) {
      return this.NOT_FOUND(res, 'Record Not Found');
    }
    const conflicts = await this.MODEL.findOne({
      where: {
        name: {
          [Op.eq]: req.body.name.toLowerCase(),
        },
      },
    });
    if ( conflicts ) {
      return res.status(CONFLICTS).send({
        status: false, message: 'Name already exists. Name must be unique',
      });
    }
    req.payload = req.body;
    const data = await result.update(req.body);
    return res.send({
      status: true,
      message: 'Record Updated',
      data,
    });
  }

};
