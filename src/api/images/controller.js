const Base = require('../base');
const { Op } = require('sequelize');

module.exports = class OptionController extends Base {
  constructor (model) {
    super();
    this.MODEL = model;
  }
};
