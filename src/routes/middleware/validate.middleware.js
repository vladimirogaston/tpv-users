const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(500).json({errores: errors.array()});
    } else {
        next();
    }
}

module.exports = validate;