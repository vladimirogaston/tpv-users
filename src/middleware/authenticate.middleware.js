const { UserDAO } = require('../models/db')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const HttpException = require('./HttpException')

module.exports = async function auth(req, res, next) {
    const authHeader = req.headers['authorization']
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new HttpException(403, 'Bad formed header exception')
    }

    try {
        dotenv.config()
        const secretKey = process.env.SECRET_JWT
        const token = authHeader && authHeader.split(' ')[2]
        const decoded = jwt.verify(token, secretKey);
        const userRole = UserDAO.findByPk(Number(decoded.id))
        req.body.role = userRole
        next()
    }catch(err){
        res.status(500).send('ERROR VERIFY')
    }
}