const router = require('express').Router()
const users = require('./user.route')

router.use('/users', users)

module.exports = router
