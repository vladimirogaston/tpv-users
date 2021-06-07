const Role = require('../models/user.roles')
const setCustomerRol = (req, res, next) => {
    req.body.role = Role.CUSTOMER
    next()
}

module.exports = setCustomerRol