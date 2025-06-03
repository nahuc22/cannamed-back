import { DataTypes } from "sequelize";

const Category = (sequelize) => {
    sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

export default Category;