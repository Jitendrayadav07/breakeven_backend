// models/Expense.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Expense = sequelize.define(
    "Expense",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING
        },
        amount :{
            type: DataTypes.INTEGER
        }
    },
    {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
    }
);

module.exports = Expense;
