const { body } = require('express-validator')

exports.createCustomerSchema = [
    body('username')
        .exists().bail()
        .notEmpty().bail(),
    body('password')
        .exists().bail()
        .notEmpty().bail(),
    body('role').
        not().exists().bail()
]