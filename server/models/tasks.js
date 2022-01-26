"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tasks.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      actual_hours: DataTypes.FLOAT,
      estimated_hours: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "tasks",
    }
  );
  tasks.associate = (models) => {
    tasks.hasMany(models.labels, {
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });
    tasks.belongsTo(models.invoices);
    tasks.hasMany(models.attachments, {
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });
    tasks.belongsToMany(models.members, { through: "membersdata" });
  };
  return tasks;
};
