const responseStatuses = require('../../lib/mixins/responseStatuses');

function validateRules ( rule, body ) {
  const { error } = rule.validate(body);
  if ( error ) {
    return { error: true, message: error.details[0].message };
  }
  return { error: false };
}

module.exports = function( rules ) {
  return {
    create ( req, res, next ) {
      const validator = validateRules(rules.create, req.body);
      if ( validator.error ) {
        return responseStatuses.PRECONDITION_FAILED(res, validator.message);
      }
      next();
    },
    update ( req, res, next ) {
      const validator = validateRules(rules.update, req.body);
      if ( validator.error ) {
        return responseStatuses.PRECONDITION_FAILED(res, validator.message);
      }
      next();
    },
  };
};