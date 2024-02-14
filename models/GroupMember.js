// models/AddGroupMember.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AddGroupMember = sequelize.define(
    "GroupMembers",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
  
  module.exports = AddGroupMember;
  