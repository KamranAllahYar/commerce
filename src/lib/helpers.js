const { Op } = require('sequelize');
const queryBuilder = require('./queryBuilder');

const helpers = {
  queryBuilder: function( query ) {
    const cloned = ( ( { page, pageSize, ...o } ) => o )(query);
    let newQuery = {};
    delete cloned.page;
    delete cloned.pageSize;
    Object.entries(cloned).forEach(( [key, value] ) => {
      if ( typeof value === 'object' ) {
        for ( const property in value ) {
          if ( property === '$like' ) {
            newQuery = queryBuilder.like(newQuery, key, value[property]);
          }
          else {
            newQuery = queryBuilder.equals(newQuery, key, value[property]);
          }
        }
      }
      else {
        newQuery = queryBuilder.equals(newQuery, key, value);
      }
    });
    if ( emptyObject(newQuery) ) {
      return query;
    }
    else {
      return newQuery;
    }
  },
};
module.exports = helpers;