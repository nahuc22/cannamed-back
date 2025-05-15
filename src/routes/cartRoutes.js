const express = require("express");
const { addToCart , deleteFromCart ,getItemsCart } = require("../controllers/cartController");
const isAuthenticated = require("../middleware/authenticate")

const router = express.Router();

router.post("/add", addToCart);
router.delete("/:productId", isAuthenticated , deleteFromCart)
router.get("/", isAuthenticated , getItemsCart);

module.exports = router;