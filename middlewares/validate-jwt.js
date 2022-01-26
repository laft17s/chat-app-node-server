const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    // Leer Token
    const token = req.header('X-Token');


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token en la petición'
        });
    }

    try {


        const { userId } = jwt.verify(token, process.env.JWT_KEY);

        req.userId = userId;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token NO válido'
        });
    }


}

module.exports = {
    validateToken
}