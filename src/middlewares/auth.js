const jwt = require('jsonwebtoken');
const UserController = require('../api/rest/users/controller');
module.exports = async ( req, res, next ) => {
  const authorization = req.headers.authorization;
  if ( typeof authorization !== 'undefined' ) {
    const bearer = authorization.split(' ');
    if ( bearer[1] ) {
      const bearerToken = bearer[1];
      req.token = bearerToken;
      const decoded = await jwt.verify(bearerToken, process.env.JWT_SECRET);
      if ( decoded ) {
        const users = new UserController();
        req.user = await users.findUserById(decoded.id);
        next();
      }
      else {
        return res.status(403).send({ message: 'Unauthorized' });
      }
    }
    else {
      return res.status(403).send({ message: 'Unauthorized' });
    }
  }
  else {
    return res.status(403).send({ message: 'Unauthorized' });
  }
};

