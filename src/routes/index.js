import { Router } from "express";
import userRouters from "./usersRoutes.js";
import productRouters from "./productRoutes.js";
import cartRouters from "./cartRoutes.js";
import payRouters from "./payRoutes.js";
import authRouters from "./authRoutes.js";
import orderRouters from "./orderRoutes.js";

const mainRouter = Router();

mainRouter.use("/users", userRouters);
mainRouter.use("/auth", authRouters);
mainRouter.use("/products", productRouters);
mainRouter.use("/cart", cartRouters);
mainRouter.use("/pay", payRouters);
mainRouter.use("/order", orderRouters);

export default mainRouter;
