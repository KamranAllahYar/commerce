'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
module.exports = {
  async up ( queryInterface, Sequelize ) {
    const records = [
      {
        first_name: 'Kamran',
        last_name: 'Allah Yar',
        password: await bcrypt.hash('12345678', 10),
        email: 'kamranallahyar@outlook.com',
        username: 'kamranallahyar',
        created_at: faker.date.recent(),
        updated_at: faker.date.soon(),
      },
    ];
    for ( let i = 0; i < 9; i++ ) {
      const created_at = faker.date.recent();
      const updated_at = created_at;
      const first_name = faker.name.firstName();
      const last_name = faker.name.lastName();
      records.push({
        first_name,
        last_name,
        password: await bcrypt.hash('12345678', 10),
        email: faker.internet.email(first_name, last_name).toLowerCase(),
        username: faker.internet.userName(first_name, last_name).toLowerCase(),
        created_at: created_at,
        updated_at: updated_at,
      });
    }

    await queryInterface.bulkInsert('Users', records, {});
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
