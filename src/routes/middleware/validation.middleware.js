const { validationResult } = require('express-validator');

const validation = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(500).json({errores: errors.array()});
    } else {
        next();
    }
}

module.exports = validation;