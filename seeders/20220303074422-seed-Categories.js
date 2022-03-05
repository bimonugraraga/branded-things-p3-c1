'use strict';
const fs = require('fs')
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
    let catData = JSON.parse(fs.readFileSync('./data/seedCategory.json', 'utf-8'))
    catData.forEach((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    // console.log(catData)
    await queryInterface.bulkInsert('Categories', catData, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Categories', null, {
       truncate: true,
       resetIdentity: true
     })
  }
};
