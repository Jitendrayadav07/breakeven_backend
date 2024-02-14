// models/GroupUserMapping.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const GroupUserMapping = sequelize.define(
    "GroupUserMappings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
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
  
  module.exports = GroupUserMapping;
  