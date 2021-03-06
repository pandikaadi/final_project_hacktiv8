'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Barbers','lat',{ type: Sequelize.DECIMAL});
     await queryInterface.addColumn('Barbers','long',{ type: Sequelize.DECIMAL});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('Barbers','lat');
     await queryInterface.removeColumn('Barbers','long');
  }
};
