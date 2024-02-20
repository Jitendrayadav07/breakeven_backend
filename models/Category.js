// models/Category.js
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "categories",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            category_name: {
                type: DataTypes.STRING
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
        }
     );
    
     return Category;
}
    
    