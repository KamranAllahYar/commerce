const CacheService = require('../../services/cache.js');
const ttl = 60 * 60; // cache for 1 Hour

global.emptyObject = ( object ) => {
  return object &&
      Object.keys(object).length === 0 &&
      object.constructor === Object;
};
global.isNumeric = ( value ) => !isNaN(value);
global.isObject = ( value ) => typeof value === 'object';
global.CACHE = new CacheService(ttl);
global.SUCCESS = 200;
global.CONFLICTS = 409;
global.SERVER_ERROR = 500;
global.UNAUTHORIZED = 403;
global.PRECONDITION_FAILED = 412;
global.NOT_FOUND = 404;
