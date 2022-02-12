"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Task }) {
      // define association here
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
