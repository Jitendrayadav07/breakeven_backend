// models/GroupType.js

module.exports = (sequelize, DataTypes) => {
    const GroupType = sequelize.define(
        "groups_type",
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          group_type: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },
        {
          underscored: true,
          freezeTableName: true,
          timestamps: true,
        }
      );
      return GroupType;
  }
      
      