const { body } = require('express-validator')

exports.validateLoginSchema = [
    body('mobile')
        .exists().bail()
        .notEmpty().bail()
        .isInt().bail(),
    body('password')
        .exists().bail()
        .notEmpty().bail(),
]