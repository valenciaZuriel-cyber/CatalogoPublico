const verificarTokenGenerico = (req, res, next) => {
    // Capturamos el token del header 'Authorization' (Formato: Bearer TOKEN)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Definición del único token estático de la aplicación
    const TokenApp = process.env.TOKEN_APP || 'MiTokenSecretoFijo123_App';

    if (!token || token !== TokenApp) {
        return res.status(401).json({ 
            message: "Acceso denegado. TokenApp inválido o ausente para realizar consultas." 
        });
    }

    next(); // Si coincide, permite el paso al controlador de la consulta
};

module.exports = verificarTokenGenerico;