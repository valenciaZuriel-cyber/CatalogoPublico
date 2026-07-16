const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verificarTokenGenerico = require('../middleware/authMiddleware');

// Aplicar la validación de App_token a todas las consultas del módulo
router.use(verificarTokenGenerico);

// Rutas para la raíz: /api/v2/products
router.route("/")
    .get(productController.getAllProducts)
    .post(productController.createProduct);

// Rutas con ID específico: /api/v2/products/:id
router.route("/:id")
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;