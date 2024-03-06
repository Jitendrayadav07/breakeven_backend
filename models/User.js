// models/User.js

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
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
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_registered: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
  return User;
}
  
  