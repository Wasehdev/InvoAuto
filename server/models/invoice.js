"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate({ Task }) {
      this.hasMany(Task, { foreignKey: "invoiceId" });
    }
  }
  Invoice.init(
    {
      description: { type: DataTypes.TEXT },
      billable_hours: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      tableName: "invoices",
      modelName: "Invoice",
    }
  );
  return Invoice;
};
