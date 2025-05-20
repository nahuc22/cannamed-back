import { Cart, Product, Cart_Product } from "../db.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ where: { userId } });
  if (!cart) {
    cart = await Cart.create({ userId });
  }
  return cart;
};

export const addToCart = async (userId, productId, quantity = 1) => {
  if (!userId || !productId) {
    throw new Error("⚠️ userId y productId son obligatorios.");
  }

  const cart = await getOrCreateCart(userId);
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error("❌ El producto no existe.");
  }

  let cartItem = await Cart_Product.findOne({
    where: { cartId: cart.id, productId }
  });

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = await Cart_Product.create({ cartId: cart.id, productId, quantity });
  }

  return cartItem;
};

export const getCartItems = async (userId) => {
  const cart = await Cart.findOne({
    where: { userId },
    include: [
      {
        model: Product,
        through: { attributes: ["quantity"] },
        required: false
      }
    ]
  });

  if (!cart) {
    throw new Error("❌ El carrito no existe.");
  }

  if (!cart.Products || cart.Products.length === 0) {
    return { id: cart.id, cartItems: [] };
  }

  const cartItems = cart.Products.map(product => ({
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: product.Cart_Product.quantity
  }));

  return { id: cart.id, cartItems };
};

export const deleteFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ where: { userId } });

  if (!cart) {
    throw new Error("❌ El carrito no existe.");
  }

  const cartProduct = await Cart_Product.findOne({
    where: { cartId: cart.id, productId }
  });

  if (!cartProduct) {
    throw new Error("⚠️ El producto no estaba en el carrito.");
  }

  await cartProduct.destroy();

  return { message: "Producto eliminado del carrito." };
};
