const { Op } = require('sequelize');
module.exports = {
  like ( previousQuery, key, value ) {
    if ( !emptyObject(previousQuery) && previousQuery.where ) {
      previousQuery.where[key] = {
        [Op.like]: value,
      };
    }
    else {
      previousQuery = {
        where: {
          [key]: { [Op.like]: value },
        },
      };
    }
    return previousQuery;
  },
  equals ( previousQuery, key, value ) {
    if ( key === 'id' ) {
      value = parseInt(value);
    }
    if ( !emptyObject(previousQuery) && previousQuery.where ) {
      previousQuery.where[key] = {
        [Op.eq]: value,
      };
    }
    else {
      previousQuery = {
        where: {
          [key]: { [Op.eq]: value },
        },
      };
    }
    return previousQuery;
  },
};