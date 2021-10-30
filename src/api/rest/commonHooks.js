const responseStatuses = require('../../lib/mixins/responseStatuses');
module.exports = function( controller, ...args ) {
  Object.assign(controller.prototype, responseStatuses);
  const ctrl = new controller(...args);
  return {
    create: [
      ctrl.beforeCreate.bind(ctrl),
      ctrl.create.bind(ctrl),
      ctrl.afterCreate.bind(ctrl),
    ],
    find: [
      ctrl.beforeFind.bind(ctrl),
      ctrl.find.bind(ctrl),
      ctrl.afterFind.bind(ctrl),
    ],
    get: [
      ctrl.beforeGet.bind(ctrl),
      ctrl.get.bind(ctrl),
      ctrl.afterGet.bind(ctrl),
    ],
    update: [
      ctrl.beforeUpdate.bind(ctrl),
      ctrl.update.bind(ctrl),
      ctrl.afterUpdate.bind(ctrl),
    ],
    delete: [
      ctrl.beforeDestroy.bind(ctrl),
      ctrl.destroy.bind(ctrl),
      ctrl.afterDestroy.bind(ctrl),
    ],
  };
};