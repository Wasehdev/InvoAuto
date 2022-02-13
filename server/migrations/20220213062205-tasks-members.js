"use strict";

const members = require("../models/member");
const tasks = require("../models/task");
const sequelize = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("membersdata", {
      taskid: {
        type: Sequelize.INTEGER,
        references: {
          model: "tasks",
          key: "id",
        },
      },
      membersid: {
        type: Sequelize.INTEGER,
        references: {
          model: "members",
          key: "id",
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("membersdata");
  },
};
