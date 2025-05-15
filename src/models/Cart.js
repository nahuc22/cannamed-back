const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Cart = sequelize.define("Cart", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        timestamps: false
    });

    return Cart;
};
