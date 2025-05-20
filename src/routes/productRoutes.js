import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouters = Router();

productRouters.get("/", getAllProducts);
productRouters.get("/:id", getProduct);
productRouters.post("/", createProduct);
productRouters.put("/:id", updateProduct);
productRouters.delete("/:id", deleteProduct);

export default productRouters;
