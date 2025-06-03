import { Sequelize } from 'sequelize';
import userModel from './models/User.js';
import productModel from './models/Product.js';
import categoryModel from './models/Category.js'
import cartModel from './models/Cart.js';
import orderModel from './models/Order.js';
import PaymentModel from './models/Payment.js';
import cartProductModel from './models/Cart_Product.js';
import orderProductModel from './models/Order_Product.js';

import dotenv from 'dotenv';
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATABASE_URL } = process.env;
console.log(DATABASE_URL)
const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/cannamed`,
      {
        logging: false,
        dialect: 'postgres',
      }
    );


const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Inicializar modelos
userModel(sequelize);
productModel(sequelize);
categoryModel(sequelize);
cartModel(sequelize);
orderModel(sequelize);
PaymentModel(sequelize);
cartProductModel(sequelize);
orderProductModel(sequelize);

// Relaciones
export const { User, Product, Cart, Order, Payment, Cart_Product, Order_Product , Category} = sequelize.models;

//RELACIONES DE PRODUCTO
Cart.belongsToMany(Product, { through: Cart_Product, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: Cart_Product, foreignKey: 'productId' });

Order.belongsToMany(Product, { through: Order_Product, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: Order_Product, foreignKey: 'productId' });

Product.belongsToMany(Category, {through: {model:'Product_Category', unique: false}, timestamps: false})
Category.belongsToMany(Product, {through: {model:'Product_Category', unique: false}, timestamps: false})

//ORDENES
Order.hasMany(Order_Product, { foreignKey: 'orderId' });
Order_Product.belongsTo(Order, { foreignKey: 'orderId' });

Order_Product.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Order_Product, { foreignKey: 'productId' });

Order.hasMany(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

Order.belongsTo(Cart, { foreignKey: 'cartId' });
Cart.hasOne(Order, { foreignKey: 'cartId' });
//USER
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });





export { sequelize, connect };
export const models = sequelize.models;
