const User = require('../users/model');
const Base = require('../base');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const UserController = require('../users/controller');
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
      return res.status(CONFLICTS).send({ 'message': 'Already exists' });
    }
    const user = new User();
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    return this.token(req, res, user);
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
      const matched = await bcrypt.compare(req.body.password, user.password);
      if ( matched ) {
        // if ( req.body.token ) {
        return this.token(req, res, user);
        // }
        // else {
        // return this.session(req, res, user);
        // }
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

  async logout ( req, res ) {
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
      if ( matched ) {
        if ( req.body.token ) {
          return this.token(req, res, user);
        }
        else {
          return this.session(req, res, user);
        }
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

  async token ( req, res, user ) {
    const expiry = {};
    if ( !req.body.rememberMe ) {
      expiry.expiresIn = '1h';
    }
    const token = await jwt.sign(this.toJSON(user), process.env.JWT_SECRET, expiry);
    return res.send({
      token,
      user,
    });
  }

  async session ( req, res, user ) {
    req.session.loggedIn = true;
    req.session.userId = user.id;
    return res.send({
      token: '',
      user,
    });
  }

  async isTokenAuth ( req ) {
    const authorization = req.headers.authorization;
    if ( typeof authorization === 'undefined' ) {
      return false;
    }
    const bearer = authorization.split(' ');
    if ( !bearer[1] ) {
      return false;
    }
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      const decoded = await jwt.verify(bearerToken, process.env.JWT_SECRET);
      if ( !decoded ) {
        return false;
      }
      const users = new UserController();
      req.user = await users.findUserById(decoded.id);
      return true;
    }
    catch ( e ) {
      return false;
    }
  }

  async isSessionAuth ( req ) {
    const { userId, loggedIn } = req.session;
    if ( !( userId && loggedIn ) ) {
      return false;
    }
    try {
      const users = new UserController();
      req.user = await users.findUserById(userId);
      return true;
    }
    catch ( e ) {
      return false;
    }
  }

  delete () {
  }
};
