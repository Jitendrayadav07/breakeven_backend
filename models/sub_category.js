// models/Category.js
module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define(
        "sub_categories",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sub_category_name: {
                type: DataTypes.STRING
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
        }
     );
    
     return SubCategory;
}
    
    