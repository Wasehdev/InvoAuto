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
          primaryKey: true,
        },
        _Taskd: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      })
      .then(() => {
        queryInterface.addIndex("membersdata", {
          fields: ["membersid", "_Taskd"],
          name: "members_data",
          unique: true,
        });
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("membersdata");
  },
};
