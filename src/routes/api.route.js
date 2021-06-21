const router = require('express').Router()
const users = require('./user.route')
const auth = require('./auth.route')

router.use('/authentication', auth)
router.use('/users', users)

module.exports = router