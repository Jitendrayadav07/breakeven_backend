// models/Currency.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Currency = sequelize.define(
    "Currency",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING
        },
        symbol: {
            type: DataTypes.STRING
        }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
  
  module.exports = Currency;
  