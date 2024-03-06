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
            group_id :{
                type: DataTypes.INTEGER
            },
            created_by: {
                type: DataTypes.INTEGER
            },
            title: {
                type: DataTypes.STRING
            },
            gross_amount: {
                type: DataTypes.DOUBLE
            },
            currency_id: {
                type: DataTypes.INTEGER
            },
            expense_category_id : {
                type: DataTypes.INTEGER
            },
            date: {
                type: DataTypes.STRING
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
        }
     );
       return Expense;
}
    
    