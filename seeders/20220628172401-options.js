'use strict';
const { faker } = require('@faker-js/faker');
module.exports = {
  async up ( queryInterface, Sequelize ) {
    const dated = faker.date.soon();
    await queryInterface.bulkInsert('Options', [
      {
        name: 'Color',
        created_at: dated,
        updated_at: dated,
      }, {
        name: 'Size',
        created_at: dated,
        updated_at: dated,
      }, {
        name: 'Storage',
        created_at: dated,
        updated_at: dated,
      }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down ( queryInterface, Sequelize ) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
