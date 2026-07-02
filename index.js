require("dotenv").config();
const connectDB = require('./src/config/database.js');
const express = require('express');

// Importamos las rutas del catálogo
const productRoutes = require('./src/routes/productRoutes.js'); 

const app = express();
const port = 5100;

// Middleware fundamental para capturar los datos (req.body) enviados en JSON
app.use(express.json()); 

connectDB();

// Vinculamos la ruta del catálogo en tu servidor
app.use('/api/v2/products', productRoutes); 

app.listen(port, () => {
  console.log(`Hello world - Servidor corriendo en el puerto ${port}`);
});