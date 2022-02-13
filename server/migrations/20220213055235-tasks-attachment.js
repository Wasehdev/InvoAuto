"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "attachments", // name of Source table
      "tasksid", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "tasks", // name of Target table
          key: "id", // key in Target table that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("attachments", "tasksid");
  },
};
