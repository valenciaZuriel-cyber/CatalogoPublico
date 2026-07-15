const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verificarTokenGenerico = require('../middleware/authMiddleware');

// Rutas para la raíz: /api/v2/products (Protegidas con TokenApp)
router.route("/")
    .post(verificarTokenGenerico, productController.createProduct)
    .get(verificarTokenGenerico, productController.getAllProducts);

// Rutas con ID específico: /api/v2/products/:id (Protegidas con TokenApp)
router.route("/:id")
    .get(verificarTokenGenerico, productController.getProductById)
    .put(verificarTokenGenerico, productController.updateProduct)
    .delete(verificarTokenGenerico, productController.deleteProduct);

module.exports = router;