'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Barber,{foreignKey:"barberId"})
      Order.belongsTo(models.User,{foreignKey:"userId"})
      Order.belongsTo(models.Service,{foreignKey:'serviceId'})

    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    barberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'Please choose one '
        }
      }
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'date is required'
        }
      }
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'hour is required'
        }
      }
    },
    orderKey: DataTypes.STRING,
    statusPayment: DataTypes.BOOLEAN,
    statusBarber: DataTypes.STRING,
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance,option){
        instance.statusPayment = false
        instance.statusBarber = 'Pending'
        instance.orderKey = instance.date[0]+instance.date[1]+instance.hour[0]+instance.hour[1]
      },
    },
    modelName: 'Order',
  });
  return Order;
};