const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Cart_Product = sequelize.define("Cart_Product", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Cart",
                key: "id"
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Product",
                key: "id"
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Cart_Product;
};