const { body } = require('express-validator');

exports.createUserSchema = [
    body('username')
        .exists().bail(),
    body('password')
        .exists().bail(),
    body('role')
        .exists().bail()
        .notEmpty()
]

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

exports.validateLoginSchema = [
    body('username')
        .exists().bail()
        .notEmpty().bail(),
    body('password')
        .exists().bail()
     .notEmpty().bail(),
]