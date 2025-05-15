const { Preference } = require('mercadopago');
const client = require('../utils/mercadopago/configMP');
const { Order, Order_Product, Product } = require('../db');


const createPay = async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: 'orderId es requerido' });
  }

  try {
    const order = await Order.findByPk(orderId, {
      
      include: {
        model: Order_Product,
        include: Product,
      },
    });
    console.log(order)
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    if (!order.Order_Products || order.Order_Products.length === 0) {
      console.log('La orden no tiene productos:', order);
      return res.status(400).json({ error: 'La orden no contiene productos' });
    }

    const items = order.Order_Products.map(op => ({
      title: op.Product.name,
      unit_price: op.price / op.quantity,
      quantity: op.quantity,
      currency_id: 'ARS',
    }));

    const preference = new Preference(client);
    console.log("Creando preferencia con:", {
      items,
      external_reference: `order_${order.id}`,
      back_urls: {
        success: 'http://localhost:3000/home',
        failure: 'http://localhost:3000/failure',
        pending: 'http://localhost:3000/pending',
      },
      auto_return: 'approved',
    });
    const result = await preference.create({
      body: {
        items,
        external_reference: `order_${order.id}`,
        back_urls: {
          success: 'http://localhost:3000/success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending',
        },
        // auto_return: 'approved',
      },
    });
    console.log(result)
    res.json({ preferenceId: result.id });

  } catch (error) {
    console.error('Error en createPay:', error);
    res.status(500).json({ error: error.message });
  }
};
const paySucces = (req, res) => {
  // pendiente de implementación
};

const webHook = (req, res) => {
  // pendiente de implementación
};

module.exports = {
  createPay,
  paySucces,
  webHook
};
