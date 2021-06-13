const router = require('express').Router()
const users = require('./user.route')
const customers = require('./customer.route')
const auth = require('./auth.route')

router.use('/authentication', auth)
router.use('/users', users)
router.use('/customers', customers)

module.exports = router