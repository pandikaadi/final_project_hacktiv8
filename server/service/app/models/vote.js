
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
        references: {
          model: { tableName: "Barbers" },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
