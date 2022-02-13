"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("attachments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attachments: {
        type: Sequelize.BLOB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("attachments");
  },
};
