const User = require('../users/model');
const Base = require('../base');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
// const Joi = require('joi');
module.exports = class AuthController extends Base {
  async register ( req, res ) {
    const findUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { username: req.body.username ? req.body.username : null },
        ],
      },
    });
    if ( findUser ) {
      return res.status(this.CONFLICTS).send({ 'message': 'Already exists' });
    }
    const user = new User();
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    return res.send({
      'message': 'success',
      user,
    });
  }

  async login ( req, res ) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { username: req.body.username ? req.body.username : null },
        ],
      },
    });
    if ( user ) {
      delete user.password;
      const matched = await bcrypt.compare(req.body.password, user.password);
      const expiry = {};
      if ( matched ) {
        if ( !req.body.rememberMe ) {
          expiry.expiresIn = '1h';
        }
        const token = await jwt.sign(this.toJSON(user), process.env.JWT_SECRET, expiry);
        return res.send({
          token,
          user,
        });
      }
      else {
        return res.status(this.UNAUTHORIZED)
                  .send({ message: 'password is incorrect' });
      }
    }
    else {
      return res.status(this.NOT_FOUND).send({ message: 'User Not Found!' });
    }
  }

  delete () {
  }
};
