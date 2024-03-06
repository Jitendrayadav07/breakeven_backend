// models/AccessContact.js

module.exports = (sequelize, DataTypes) => {
    const AccessContact = sequelize.define(
        "access_contacts",
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
          phone_number :{
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
      return AccessContact;
  }
      
      