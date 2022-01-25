'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class labels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  labels.init({
    title: DataTypes.STRING,
    task_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'labels',
  });
  return labels;
};