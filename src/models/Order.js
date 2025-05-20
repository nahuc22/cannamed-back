import { DataTypes } from 'sequelize';

const Order = (sequelize) => {
    sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
          cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending', // Valor por defecto (pendiente)
          },
    }, { timestamps: false });
};

export default Order;