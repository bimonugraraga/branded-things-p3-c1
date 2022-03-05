'use strict';
const {hashPassword }= require('../helpers/handlePassword')


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let userData = [
    {
      "username": "admin1",
      "email": "admin1@gmail.com",
      "password": hashPassword("123456"),
      "phoneNumber": "082110517592",
      "role":"admin",
      "address": "Jakarta",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]
     await queryInterface.bulkInsert('Users', userData, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {})
  }
};
