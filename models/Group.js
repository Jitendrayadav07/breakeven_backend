// models/Group.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Group = sequelize.define(
    "Groups",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdby: {
        type: DataTypes.INTEGER,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
  
  module.exports = Group;
  