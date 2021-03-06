'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:'Username is required'
        },
        notNull:{
          msg:'Username is required'
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
    lat: DataTypes.STRING,
    long: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });


  return User;
};