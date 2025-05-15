const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
    sequelize.define("Product" ,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categories: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps:false}
    ) 
}