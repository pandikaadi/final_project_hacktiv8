'use strict';

const randomString = (length, chars) => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
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
      Order.belongsTo(models.Service,{foreignKey:'serviceId'})

    }
  }
  Order.init({
    userMonggoId: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    long: DataTypes.DECIMAL,
    barberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'Please choose one'
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'date is required'
        }, notNull:{
          msg:'date cant be null'
        }
      }
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'hour is required'
        }, notNull:{
          msg:'hour cant be null'
        }
      }
    },
    orderKey: DataTypes.STRING,
    statusPayment: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    statusBarber: DataTypes.STRING,
    price: DataTypes.INTEGER,
    paymentUrl: DataTypes.STRING,
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance,option){
        instance.statusPayment = false
        instance.statusBarber = 'Pending'
        instance.orderKey = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        // instance.orderKey = 'orderkey'
      },
    },
    modelName: 'Order',
  });
  return Order;
};