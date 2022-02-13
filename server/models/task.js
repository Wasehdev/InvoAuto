"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ Label, Attachment, Invoice, Member }) {
      this.hasMany(Label, { foreignKey: "tasksid" });
      this.hasMany(Attachment, { foreignKey: "tasksid" });
      this.belongsTo(Invoice, {
        foreignKey: "invoiceId",
      });
      this.belongsToMany(Member, { through: "membersdata" });
    }
  }
  Task.init(
    {
      task_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Task must have name" },
          notEmpty: { msg: "Task cannot be empty" },
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
