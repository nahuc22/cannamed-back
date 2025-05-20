import { Router } from "express";
import { createOrder, getOrderById } from "../controllers/orderController.js";
import isAuthenticated from "../middleware/authenticate.js";

const orderRouters = Router();

orderRouters.post("/create", isAuthenticated, createOrder);
orderRouters.get("/:id", getOrderById);

export default orderRouters;
