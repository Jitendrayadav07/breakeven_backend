// models/Group.js

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
      "groups",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdby: {
          type: DataTypes.INTEGER,
        },
        type_id: {
          type: DataTypes.INTEGER,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        }
      },
      {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
      }
    );
    return Group;
}
    
    