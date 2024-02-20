// models/GroupIcon.js

module.exports = (sequelize, DataTypes) => {
    const GroupIcon = sequelize.define(
        "groups_icon",
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          icon: {
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
      return GroupIcon;
  }
      
      