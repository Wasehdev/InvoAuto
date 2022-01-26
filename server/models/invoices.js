"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoices.init(
    {
      description: DataTypes.TEXT,
      billable_hours: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "invoices",
    }
  );
  invoices.associate = (models) => {
    invoices.hasMany(models.tasks, {
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });
  };
  return invoices;
};
