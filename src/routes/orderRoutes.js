const { Router } = require("express");
const { createOrder , getOrderById} = require("../controllers/orderController.js")
const isAuthenticated = require("../middleware/authenticate")

const orderRouters = Router();

orderRouters.post("/create", isAuthenticated , createOrder )
orderRouters.get("/:id", getOrderById )

module.exports = orderRouters;