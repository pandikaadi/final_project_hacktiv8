'use strict';
const {
  Model
} = require('sequelize');
const { createHash } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Barber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Barber.hasMany(models.Order,{foreignKey:"barberId"})
      Barber.hasMany(models.Vote,{foreignKey:'barberId'})
    }
  }
  Barber.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'Name is required'
        },
        notNull:{
          msg:'Name is required'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:true,
        notEmpty:{msg:'Email is required'},
        notNull:{
          msg:'Email is required'
        }
      }},
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [5, 12],
        notEmpty:{msg:'Password is required'},
        notNull:{
          msg:'Password is required'
        }
      }},
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'Phone Number is required'
        },
        notNull:{
          msg:'Phone Number is required'
        }
      }
    },
    role: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    city: DataTypes.STRING,
    long: DataTypes.DECIMAL
  }, {
    sequelize,
    hooks:{
      beforeCreate(user,option){
        user.role = 'Barber'
      }
    },
    modelName: 'Barber',
  });
  Barber.beforeCreate((instanceBarber, options)=>{
    const hashPassword = createHash(instanceBarber.password);
    instanceBarber.password = hashPassword
  })
  return Barber;
};