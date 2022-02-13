"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate({ Task }) {
      this.belongsToMany(Task, { through: "membersdata" });
    }
  }
  Member.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Member must have name" },
          notEmpty: { msg: "Member cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Member",
      tableName: "members",
    }
  );
  return Member;
};
