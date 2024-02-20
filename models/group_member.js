// models/AddGroupMember.js

module.exports = (sequelize, DataTypes) => {
  const AddGroupMember = sequelize.define(
      "group_members",
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
        contact_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        group_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
      }
    );
    return AddGroupMember;
}
    