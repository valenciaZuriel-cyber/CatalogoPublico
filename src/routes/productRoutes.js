const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const productController = require("../controllers/productController");
const verificarTokenGenerico = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || 'llave_generica_secreta_123';

// 🔑 Nueva ruta para generar el token genérico (vence en 7 días)
router.get('/generar-token', (req, res) => {
    const payload = { info: "acceso_general_consultas" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }); 
    
    res.status(200).json({
        message: "Token genérico generado con éxito. Úsalo en tus headers de consulta.",
        token: token
    });
});

// Rutas para la raíz: /api/v2/products (Protegidas)
router.route("/")
    .post(verificarTokenGenerico, productController.createProduct)
    .get(verificarTokenGenerico, productController.getAllProducts);

// Rutas con ID específico: /api/v2/products/:id (Protegidas)
router.route("/:id")
    .get(verificarTokenGenerico, productController.getProductById)
    .put(verificarTokenGenerico, productController.updateProduct)
    .delete(verificarTokenGenerico, productController.deleteProduct);

module.exports = router;