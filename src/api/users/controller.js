const User = require('./model');
const Base = require('../base');
module.exports = class UserController extends Base {
  constructor () {
    super();
    this.MODEL = User;
  }

  async index ( req, res ) {
    let query = {};
    if ( req.user && req.user.id ) {
      query = { where: { id: req.user.id } };
    }
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 15;
    query = { ...query, ...this.paginate(page, pageSize) };
    const results = await this.MODEL.findAndCountAll(query);
    return res.send({
      pageSize,
      page, ...results,
    });
  }

  async create () {
    const jane = await this.MODEL.create({
      firstName: 'Jane',
      lastName: 'Doe',
    });
    console.log('Jane\'s auto-generated ID:', jane.id);
  }

  async findUserById ( userId ) {
    const key = `getAuthUser_${ userId }`;
    return CACHE.get(key, async () => {
      let user = await this.MODEL.findByPk(userId);
      user = this.toJSON(user);
      delete user.password;
      return user;
    }).then(( result ) => {
      return result;
    });
  }

  update () {
  }

  delete () {
  }
};
