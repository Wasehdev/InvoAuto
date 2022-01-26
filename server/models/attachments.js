"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  attachments.init(
    {
      attachments: DataTypes.BLOB,
      task_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "attachments",
    }
  );
  attachments.belongsTo(models.tasks);
  return attachments;
};
