import { Order, Cart_Product, Order_Product, Product, Cart, User } from "../db.js";

export const createOrder = async ({ userId, productId, cartId, status = "pending" }) => {
  if (!userId || (!productId && !cartId)) {
    throw new Error("Faltan datos requeridos");
  }

  let totalPrice = 0;
  let createdOrder = null;

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

  const orderProducts = await Order_Product.findAll({
    where: { orderId: createdOrder.id },
    include: [{
      model: Product,
      attributes: ["id", "name", "price", "image"]
    }]
  });

  return {
    ...createdOrder.toJSON(),
    products: orderProducts,
  };
};

export const getOrderById = async (id) => {
  const order = await Order.findByPk(id, {
    include: [
      {
        model: Product,
        through: { attributes: ["quantity"] },
      },
      {
        model: Cart,
        include: [{ model: User }],
      },
    ],
  });

  if (!order) {
    throw new Error("Orden no encontrada");
  }

  const products = order.Products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: product.Order_Product?.quantity || 0,
    image: product.image,
  }));

  return {
    id: order.id,
    userId: order.userId,
    products,
  };
};
