import express from "express";
import { addToCart, deleteFromCart, getItemsCart } from "../controllers/cartController.js";
import isAuthenticated from "../middleware/authenticate.js";

const router = express.Router();

router.post("/add", addToCart);
router.delete("/:productId", isAuthenticated, deleteFromCart);
router.get("/", isAuthenticated, getItemsCart);

export default router;
