import * as cartService from '../services/cartServices.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "userId y productId son requeridos." });
    }

    await cartService.addToCart(userId, productId, quantity || 1);

    const updatedCartItems = await cartService.getCartItems(userId);

    res.status(200).json({ message: "Producto agregado al carrito", cartItems: updatedCartItems });
  } catch (error) {
    console.error("❌ Error en addToCart:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getItemsCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await cartService.getCartItems(userId);

    if (!cart || cart.cartItems.length === 0) {
      return res.status(200).json({ message: "Carrito vacío", cartItems: [], id: null });
    }

    res.status(200).json({
      id: cart.id,
      cartItems: cart.cartItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos del carrito" });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!userId || !productId) {
      throw new Error("Faltan datos: userId o productId");
    }

    await cartService.deleteFromCart(userId, productId);

    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el producto", error: error.message });
  }
};
