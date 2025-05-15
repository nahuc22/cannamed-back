const  { Router } = require("express");
const userRouters = require ("./usersRoutes");
const productRouters = require("./productRoutes");
const cartRouters = require("./cartRoutes.js")
const payRouters = require("./payRoutes.js")
const authRouters = require("./authRoutes.js")
const orderRouters = require("./orderRoutes.js")

const mainRouter = Router();

mainRouter.use("/users", userRouters);
mainRouter.use("/auth", authRouters);
mainRouter.use("/products", productRouters);
mainRouter.use("/cart", cartRouters);
mainRouter.use("/pay", payRouters);
mainRouter.use("/order", orderRouters);

module.exports = mainRouter;
