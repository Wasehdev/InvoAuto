"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tasks",
      [
        {
          task_name: "Abdul",
          description: "Abdul's Work",
          actual_hours: "3.5",
          estimated_hours: "4",

          createdAt: "2022-02-10T06:24:46.780Z",
          updatedAt: "2022-02-10T06:24:46.780Z",
        },
        {
          task_name: "Mudassar",
          description: "Mudassar's Work",
          actual_hours: "3.5",
          estimated_hours: "4",

          createdAt: "2022-02-10T06:24:46.780Z",
          updatedAt: "2022-02-10T06:24:46.780Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
