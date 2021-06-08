const { body } = require('express-validator')

exports.validateLoginSchema = [
    body('username')
        .exists().bail()
        .notEmpty().bail(),
    body('password')
        .exists().bail()
     .notEmpty().bail(),
]