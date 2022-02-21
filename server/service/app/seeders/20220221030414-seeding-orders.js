'use strict';

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
     const orders = require("../db/order.json");

     orders.forEach((v) => {
       delete v.id;
       v.createdAt = new Date();
       v.updatedAt = new Date();
     });
 
     await queryInterface.bulkInsert("Orders", orders);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Orders", null, {});
  }
};
