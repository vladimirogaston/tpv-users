const { body } = require('express-validator')
const roles = require('../../models/roles.model')

exports.createUserSchema = [
    body('mobile')
        .exists().bail()
        .notEmpty().bail()
        .isInt().bail(),
    body('email')
        .exists().bail()
        .notEmpty().bail()
        .isEmail().bail(),
    body('firstname')
        .exists().bail()
        .notEmpty().bail(),
    body('surname')
        .exists().bail()
        .notEmpty().bail(),
    body('password')
        .exists().bail()
        .notEmpty().bail(),
    body('dni')
        .exists().bail()
        .notEmpty().bail()
        .isInt().bail(),
    body('role')
        .exists().bail()
        .isIn([roles.CUSTOMER, roles.ADMIN, roles.OPERATOR]).bail()
        .notEmpty().bail()
]