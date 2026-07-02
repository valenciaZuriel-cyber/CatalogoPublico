const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Rutas para la raíz: /api/v2/products
router.route("/")
    .post(productController.createProduct)
    .get(productController.getAllProducts);

// Rutas con ID específico: /api/v2/products/:id
router.route("/:id")
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;