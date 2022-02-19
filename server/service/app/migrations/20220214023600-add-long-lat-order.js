'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Orders','lat',{ type: Sequelize.INTEGER});
     await queryInterface.addColumn('Orders','long',{ type: Sequelize.INTEGER});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Orders');
     */
     await queryInterface.removeColumn('Orders','lat');
     await queryInterface.removeColumn('Orders','long');
  }
};
