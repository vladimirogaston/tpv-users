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