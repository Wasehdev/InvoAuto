"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {
    static associate({ Task }) {
      this.belongsTo(Task, { foreignKey: "tasksid" });
    }
  }
  Attachment.init(
    {
      attachments: { type: DataTypes.BLOB },
    },
    {
      sequelize,
      tableName: "attachments",
      modelName: "Attachment",
    }
  );
  return Attachment;
};
