const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Payment", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    payment_type: {
      type: DataTypes.STRING,
    },
    orderId: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    payer_email: {
      type: DataTypes.STRING,
    }
  });
};