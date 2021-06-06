const HttpException = require('../middleware/HttpException')
const moment = require('moment')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const authenticate = (...roles) => {
    return async function (req, res, next) {
        if(!req.headers['Authentication']) throw new HttpException(404, 'Bad formed header exception')
        const token = req.headers['Authentication']
        dotenv.config()
        const payload = jwt.decode(token, process.env.SECRET_JWT)
        if(payload.expiredAt < moment().unix()) throw HttpException(500, 'El token a expirado')
        next()
    }
}

module.exports = { authenticate }
