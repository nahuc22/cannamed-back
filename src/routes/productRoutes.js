const { Router } = require("express");

const productRouters = Router();

const { 
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
productRouters.get("/", getAllProducts );
productRouters.get("/:id", getProduct);
productRouters.post("/", createProduct);
productRouters.put("/:id", updateProduct);
productRouters.delete("/:id", deleteProduct);


module.exports = productRouters;
