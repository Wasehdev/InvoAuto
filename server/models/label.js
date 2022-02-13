"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    static associate({ Task }) {
      this.belongsTo(Task, { foreignKey: "tasksid" });
    }
  }
  Label.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Label must has title" },
          notEmpty: { msg: "Label cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Label",
      tableName: "labels",
    }
  );
  return Label;
};
