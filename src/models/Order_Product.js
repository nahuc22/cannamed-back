const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Order_Product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        price: { 
            type: DataTypes.DECIMAL, 
            allowNull: false 
        }
    }, { timestamps: false,
        tableName: "Order_Product"
     });
};