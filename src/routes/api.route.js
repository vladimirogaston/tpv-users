const router = require('express').Router()
const users = require('./user.route')
const books = require('./books.route')

router.use('/users', users)
router.use('/books', books)

module.exports = router
