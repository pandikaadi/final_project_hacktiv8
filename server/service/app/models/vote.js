'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vote.belongsTo(models.Barber, { foreignKey: "barberId" });
    }
  }
  Vote.init(
    {
      userMonggoId: DataTypes.STRING,
      barberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "Barbers" },
          key: "id",
        },
        validate:{
          notNull:{
            msg:'barberId cant be null'
          }
        }
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg:'value is required'
          },
          notNull:{
            msg:'value cant be null'
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
