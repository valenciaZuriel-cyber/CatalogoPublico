const jwt = require('jsonwebtoken');

// Usamos la variable de entorno o una clave por defecto segura
const JWT_SECRET = process.env.JWT_SECRET || 'llave_generica_secreta_123';

const verificarTokenGenerico = (req, res, next) => {
    // Capturamos el token del header 'Authorization' (Formato: Bearer TOKEN)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            message: "Acceso denegado. Se requiere un token genérico para realizar consultas." 
        });
    }

    try {
        // Validamos el token
        const verificado = jwt.verify(token, JWT_SECRET);
        req.tokenData = verificado; // Guardamos los datos por si se necesitan
        next(); // Continuar con la consulta original
    } catch (error) {
        return res.status(403).json({ 
            message: "Token inválido o expirado. No autorizado para consultas." 
        });
    }
};

module.exports = verificarTokenGenerico;