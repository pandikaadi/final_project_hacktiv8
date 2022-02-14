'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.dropTable('BarberLocations');
     await queryInterface.dropTable('UserLocations');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.createTable('BarberLocations', { id: Sequelize.INTEGER });
     await queryInterface.createTable('UserLocations', { id: Sequelize.INTEGER });
  }
};
