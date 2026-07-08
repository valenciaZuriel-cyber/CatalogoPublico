const Product = require("../Modules/products.js"); // <-- Asegúrate de que coincida EXACTAMENTE con tus carpetas reales
const mongoose = require("mongoose"); // <-- ¡FALTABA ESTA IMPORTACIÓN!

// 1. CREATE: Agregar un nuevo producto al catálogo
exports.createProduct = async (req, res) => {
    try {
        const { name, description, category, price, quantity } = req.body;

        const newProduct = new Product({
            name,
            description,
            category,
            price,
            quantity
        });

        await newProduct.save();
        res.status(201).json({ message: "Producto creado con éxito en el catálogo", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error: error.message });
    }
};

// 2. READ: Obtener todo el catálogo público
exports.getAllProducts = async (req, res) => {
    try {
        // Corregido de 'moongose' a 'mongoose'
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
};

// 3. READ: Obtener un solo producto por su ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "El producto no existe" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el producto", error: error.message });
    }
};

// 4. UPDATE: Editar datos del producto
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "No se encontró el producto para actualizar" });
        }

        res.status(200).json({ message: "Producto actualizado con éxito", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
    }
};

// 5. DELETE: Eliminar un producto del catálogo
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "El producto que intentas borrar no existe" });
        }
        res.status(200).json({ message: "Producto eliminado del catálogo correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
    }
};