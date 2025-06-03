import express from "express";
import { addToCart, deleteFromCart, getItemsCart } from "../controllers/cartController.js";
import isAuthenticated from "../middleware/authenticate.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.delete("/:productId", isAuthenticated, deleteFromCart);
cartRouter.get("/", isAuthenticated, getItemsCart);

export default cartRouter;
