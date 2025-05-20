import { Router } from "express";
import { createPay, paySucces, webHook } from "../controllers/payController.js";

const payRouters = Router();

payRouters.post("/create", createPay);
payRouters.get("/:id", paySucces);
payRouters.get("/", webHook);

export default payRouters;
