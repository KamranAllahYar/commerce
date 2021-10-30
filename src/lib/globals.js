global.emptyObject = ( object ) => {
  return object &&
      Object.keys(object).length === 0 &&
      object.constructor === Object;
};
global.isNumeric = ( value ) => !isNaN(value);
global.isObject = ( value ) => typeof value === 'object';