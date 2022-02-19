'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userMonggoId: 
        { 
          type: Sequelize.STRING ,
        },
      barberId: { type: Sequelize.INTEGER ,
        references:{
          model:{tableName:'Barbers'},
          key:'id'
        }
        },
      date: {
        type: Sequelize.DATE
      },
      hour: {
        type: Sequelize.STRING
      },
      orderKey: {
        type: Sequelize.STRING
      },
      statusPayment: {
        type: Sequelize.BOOLEAN
      },
      statusBarber: {
        type: Sequelize.STRING
      },
      statusOrder: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};