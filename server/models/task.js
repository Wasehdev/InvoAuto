"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Label }) {
      // define association here
      this.hasMany(Label, { foreignKey: "tasksid" });
    }
  }
  Task.init(
    {
      task_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Task Name must have name" },
          notEmpty: { msg: "Task Name cannot be empty" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      actual_hours: DataTypes.DOUBLE,
      estimated_hours: DataTypes.DOUBLE,
    },
    {
      sequelize,
      tableName: "tasks",
      modelName: "Task",
    }
  );
  return Task;
};
