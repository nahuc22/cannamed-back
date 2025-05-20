import { Preference } from 'mercadopago';
import client from '../utils/mercadopago/configMP.js';
import { Order, Order_Product, Product } from '../db.js';

export const createPay = async (req, res) => {
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

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    if (!order.Order_Products || order.Order_Products.length === 0) {
      return res.status(400).json({ error: 'La orden no contiene productos' });
    }

    const items = order.Order_Products.map(op => ({
      title: op.Product.name,
      unit_price: op.price / op.quantity,
      quantity: op.quantity,
      currency_id: 'ARS',
    }));

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items,
        external_reference: `order_${order.id}`,
        back_urls: {
          success: 'http://localhost:3000/success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending',
        },
      },
    });

    res.json({ preferenceId: result.id });

  } catch (error) {
    console.error('Error en createPay:', error);
    res.status(500).json({ error: error.message });
  }
};

export const paySucces = (req, res) => {
  // pendiente de implementación
};

export const webHook = (req, res) => {
  // pendiente de implementación
};
