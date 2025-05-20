import { Product } from '../db.js';

export const createProduct = async (req, res) => {
  const { name, description, price, stock, image, categories } = req.body;
  try {
    const newProduct = await Product.create({ name, description, price, stock, image, categories });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: `No se encontró un producto con el ID ${id}` });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: `No se encontró un producto con el ID ${id}` });
    }

    await product.destroy();

    res.status(200).send(`El producto con ID ${id} ha sido eliminado con éxito.`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, image, categories } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: `No se encontró un producto con el ID ${id}` });
    }

    const updatedProduct = await product.update({
      name,
      description,
      price,
      stock,
      image,
      categories
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
