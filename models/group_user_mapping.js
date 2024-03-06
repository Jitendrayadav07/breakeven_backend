// models/GroupUserMapping.js

module.exports = (sequelize, DataTypes) => {
    const GroupUserMapping = sequelize.define(
    "group_user_mappings",
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
  return GroupUserMapping;
}
  