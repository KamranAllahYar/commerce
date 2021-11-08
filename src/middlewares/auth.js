const jwt = require('jsonwebtoken');
const AuthController = require('../api/rest/auth/controller');
module.exports = async ( req, res, next ) => {
  const authController = new AuthController();
  let response;
  response = await authController.isTokenAuth(req);
  if ( !response ) {
    return res.status(403).send({ message: 'Unauthorized' });
  }
  next();
};

