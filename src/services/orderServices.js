const { Order, Cart_Product, Order_Product, Product, Cart , User} = require("../db");

const createOrder = async ({ userId, productId, cartId, status = "pending" }) => {
  if (!userId || (!productId && !cartId)) {
    throw new Error("Faltan datos requeridos");
  }

  let totalPrice = 0;
  let createdOrder = null;

  // ✅ Compra directa
  if (productId) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error("Producto no encontrado");

    totalPrice = product.price;

    createdOrder = await Order.create({
      userId,
      cartId: null,
      price: totalPrice,
      status,
    });

    await Order_Product.create({
      orderId: createdOrder.id,
      productId: product.id,
      quantity: 1,
      price: product.price,
    });

  } else if (cartId) {
    // ✅ Compra desde carrito
    const cartProducts = await Cart_Product.findAll({ where: { cartId } });

    for (const cp of cartProducts) {
      const product = await Product.findByPk(cp.productId);
      if (!product) continue;

      const quantity = cp.quantity || 1;
      totalPrice += product.price * quantity;
    }

    createdOrder = await Order.create({
      userId,
      cartId,
      price: totalPrice,
      status,
    });

    for (const cp of cartProducts) {
      const product = await Product.findByPk(cp.productId);
      if (!product) continue;

      const quantity = cp.quantity || 1;

      await Order_Product.create({
        orderId: createdOrder.id,
        productId: cp.productId,
        quantity,
        price: product.price * quantity,
      });
    }
  }

  // 🔁 Traer productos asociados a la orden con info del producto
  const orderProducts = await Order_Product.findAll({
    where: { orderId: createdOrder.id },
    include: [{
      model: Product,
      attributes: ['id', 'name', 'price', 'image'] // seleccioná los campos que querés
    }]
  });

  return {
    ...createdOrder.toJSON(),
    products: orderProducts,
  };
};

const getOrderById = async (id) => {
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          through: { attributes: ['quantity'] }, // Incluye la cantidad de productos en la relación
        },
        {
          model: Cart, // Si deseas incluir el carrito también, por ejemplo, para obtener el usuario relacionado
          include: [{ model: User }],
        },
      ],
    });

    if (!order) {
      throw new Error('Orden no encontrada');
    }

    const products = order.Products.map((product) => {
      // Asegurarse de que cada producto tenga la cantidad y otros detalles necesarios
      const quantity = product.Order_Product?.quantity || 0;
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.image,
      };
    });

    return {
      id: order.id,
      userId: order.userId,
      products: products,
    };
  } catch (error) {
    console.error('Error al obtener la orden:', error.message);
    throw new Error(error.message || 'Error al obtener la orden');
  }
};

module.exports = { createOrder , getOrderById};
