const { body } = require('express-validator')

exports.loginSchema = [
    body('mobile')
        .exists().bail()
        .notEmpty().bail()
        .isInt().bail(),
    body('password')
        .exists().bail()
        .notEmpty().bail(),
]
