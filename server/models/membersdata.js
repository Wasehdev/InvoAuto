'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class membersdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  membersdata.init({
    task_id: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'membersdata',
  });
  return membersdata;
};