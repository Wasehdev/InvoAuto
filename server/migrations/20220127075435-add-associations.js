"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    //tasks has many labels
    return queryInterface
      .addColumn("labels", "tasksid", {
        type: Sequelize.INTEGER,
        references: {
          model: "tasks",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })

      .then(() => {
        // invoices hasMany tasks
        return queryInterface.addColumn(
          "tasks", // name of Target model
          "invoiceId", // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: "invoices", // name of Source model
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          }
        );
      })
      .then(() => {
        // tasks hasMany attachments
        return queryInterface.addColumn(
          "attachments", // name of Target model
          "tasksid", // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: "tasks", // name of Source model
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          }
        );
      });
  },
  //undo tasks hasMany labels
  async down(queryInterface, Sequelize) {
    return (
      queryInterface
        .removeColumn("labels", "tasksid")
        //undo invoices hasMany tasks
        .then(() => {
          return queryInterface.removeColumn("tasks", "invoiceId");
        })
        //undo tasks has many attachments
        .then(() => {
          return queryInterface.removeColumn("attachments", "tasksid");
        })
    );
  },
};
