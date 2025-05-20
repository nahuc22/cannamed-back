import * as orderService from '../services/orderServices.js';

export const createOrder = async (req, res) => {
  const { userId, productId, cartId, email } = req.body;

  console.log("📦 Datos recibidos en el body:", req.body);

  try {
    const newOrder = await orderService.createOrder({ userId, productId, cartId });

    res.status(201).json({
      message: "Orden creada con éxito",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error en createOrderController:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await orderService.getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error al obtener la orden:', error.message);
    res.status(404).json({ error: error.message || 'Error al obtener la orden' });
  }
};
