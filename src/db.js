const { Sequelize } = require("sequelize");
const userModel = require("./models/User");
const productModel = require("./models/Product");
const cartModel = require("./models/Cart");
const orderModel = require("./models/Order");
const PaymentModel = require("./models/Payment");
const cartProductModel = require("./models/Cart_Product");
const orderProductModel = require("./models/Order_Product");

require('dotenv').config();
const { DB_USER, DB_PASSWORD , DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/cannamed`,
    { logging: false }
);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Inicializar modelos
userModel(sequelize);
productModel(sequelize);
cartModel(sequelize);
orderModel(sequelize);
PaymentModel(sequelize);
cartProductModel(sequelize);
orderProductModel(sequelize);

// Relaciones
const { User, Product, Cart, Order, Payment, Cart_Product, Order_Product } = sequelize.models;

User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, { through: Cart_Product, foreignKey: "cartId" });
Product.belongsToMany(Cart, { through: Cart_Product, foreignKey: "productId" });

// Relación entre Usuario y Orden
Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

// Relación entre Orden y Productos (puede ser compra directa)
Order.belongsToMany(Product, { through: Order_Product, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: Order_Product, foreignKey: "productId" });

Order.hasMany(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });

// Relación entre Orden y Carrito (para cuando se genera a partir del carrito completo)
Order.belongsTo(Cart, { foreignKey: "cartId" });
Cart.hasOne(Order, { foreignKey: "cartId" });

Order.hasMany(Order_Product, { foreignKey: "orderId" });
Order_Product.belongsTo(Order, { foreignKey: "orderId" });

// 🔄 Relaciones directas necesarias para eager loading
Order_Product.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Order_Product, { foreignKey: "productId" });


module.exports = { sequelize, ...sequelize.models, connect };