"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "labels", // name of Source model
      "tasksid", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "tasks", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "labels", // name of Source model
      "tasksid" // key we want to remove
    );
  },
};
