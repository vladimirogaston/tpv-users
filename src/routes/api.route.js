const router = require('express').Router()
const users = require('./user.route')
const books = require('./books.route')

router.use('/books', books)
router.use('/users', users)

module.exports = router
