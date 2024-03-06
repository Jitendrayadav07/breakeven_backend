// models/GroupUserMapping.js

module.exports = (sequelize, DataTypes) => {
    const GroupUserMapping = sequelize.define(
    "expense_user_mapping",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      expense_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      share_percentage: {
        type: DataTypes.DOUBLE
      },
      due_amount: {
        type: DataTypes.DOUBLE
      },
      is_settled: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      to_user_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
  return GroupUserMapping;
}
  