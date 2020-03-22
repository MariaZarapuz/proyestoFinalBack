const jwt = require('jwt-simple');
const moment = require('moment');
const fs = require('fs')


const checkToken = (req, res, next) => {
    // 
    /* console.log('Pasa por checktoken') */
    if (!req.headers['user-token']) {
        return res.json({ error: 'Debes incluir la cabecera user-token' })
    }

    // Comprobamos si el token es correcto
    const token = req.headers['user-token'];
    let payload = null;
    try {
        payload = jwt.decode(token, process.env.SECRET_KEY);
    } catch (err) {
        console.log(err);
        return res.json({ error: 'El token es incorrecto' })
    }

    // Mirar si el token ha expirado
    const fechaActual = moment().unix();
    if (fechaActual > payload.fechaExpiración) {
        return res.json({ error: 'El token está caducado' })
    }
    req.payload = payload;

    next();
};



const registerAction = (req, res, next) => {
    fs.appendFileSync('../logs/userActions.log', `Usuario: ${req.payload.usarioId}. Método: ${req.method}. Url: ${req.url}`);
    next();
};

module.exports = {
    checkToken: checkToken,
    registerAction: registerAction
}