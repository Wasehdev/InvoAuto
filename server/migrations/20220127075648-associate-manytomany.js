"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .createTable("membersdata", {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        membersid: {
          type: Sequelize.INTEGER,
          references: {
            model: "members", // 'Movies' would also work
            key: "id",
          },
        },

        tasksid: {
          type: Sequelize.INTEGER,
          references: {
            model: "tasks", // 'Movies' would also work
            key: "id",
          },
        },
      })
      .then(() => {
        queryInterface.addIndex("membersdata", {
          fields: ["membersid", "tasksid"],
          name: "members_data",
          unique: true,
        });
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("membersdata");
  },
};
