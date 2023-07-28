
const jwt = require('jsonwebtoken');

const chequearToken = (req, res, next)=>{
    if( !req.headers['authorization']){
        return res.json({error: 'Acceso denegado'})
    }

    const token = req.headers['authorization'];
    let info
    try {
        let info = jwt.verify(token, 'TiendaDeRopa')
    } catch (error) {
        return res.json({error: 'El token es incorrecto'})
    }
    next();
}

module.exports = {chequearToken};  