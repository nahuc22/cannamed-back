const { Router } = require("express");

const payRouters = Router();

const { createPay, paySucces, webHook } = require("../controllers/payController.js")

payRouters.post("/create", createPay )
payRouters.get("/:id", paySucces)
payRouters.get("/", webHook)

module.exports = payRouters;