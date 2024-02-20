// models/Expense.js

module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define(
        "expenses",
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
       return Expense;
}
    
    