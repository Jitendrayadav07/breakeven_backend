// models/Category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category_name: {
            type: DataTypes.STRING
        },
    },
    {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
    }
);

module.exports = Category;
