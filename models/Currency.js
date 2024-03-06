// models/Currency.js
module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define(
        "currency",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING
            },
            code: {
                type: DataTypes.STRING
            },
            symbol: {
                type: DataTypes.STRING
            }
        },
        {
          underscored: true,
          freezeTableName: true,
          timestamps: true,
        }
      );
      return Currency;
}
      
      